<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__btn-place__make-order">
        <div>
          <p class="new-order__btn-place__make-order-title">Рассчитать заказ</p>
          <p class="new-order__label package-danger">
            Внимание! Итоговая цена может отличаться от текущей. Для уточнения
            всех деталей с вами лично свяжутся в Телеграм.
          </p>
        </div>

        <Btn
          v-if="!isSending && !isOrderEdit"
          :btnData="makeOrder_btn_data"
          @actionBtn="makeOrder"
        />
        <Btn
          v-if="!isSending && isOrderEdit"
          :btnData="editOrder_btn_data"
          @actionBtn="editOrder"
        />
        <Btn v-if="isSending" :btnData="sendingOrder_btn_data" />
      </div>
    </div>
    <div class="new-order__box-btns">
      <div class="new-order__btn-place">
        <Btn :btnData="prevStep_btn_data" @actionBtn="$emit('prevStep')" />
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/ButtonUniver.vue';

export default {
  name: 'OrderComponentReady',
  props: [
    'prevStep_btn_data',
    'file',
    'tg_id',
    'clientName',
    'user',
    'promo',
    'defaultPackageMethods',
    'additionalPackageMethods',
    'userCommission',
    'orderCommission',
    'orderBelay',
    'activeTemplate',
    'templateIsUsed',
    'templateIsUsed',
    'activeEditableOrder',
    'editableOrderIsUsed',
  ],
  emits: ['prevStep', 'nextStep'],
  components: {
    Btn,
  },
  data() {
    return {
      isSending: false,
    };
  },
  computed: {
    makeOrder_btn_data() {
      // Параметры, передаваемые в кнопку
      return {
        name: 'Рассчитать заказ', // Текст на кнопке
        btnStyleName: ' new-order__btn-place', // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт
        btnColor: ' ', // Название  цветового решения ('__red', '__grey', )
      };
    },
    editOrder_btn_data() {
      // Параметры, передаваемые в кнопку
      return {
        name: 'Обновить заказ', // Текст на кнопке
        btnStyleName: ' new-order__btn-place', // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт
        btnColor: ' ', // Название  цветового решения ('__red', '__grey', )
      };
    },
    sendingOrder_btn_data() {
      // Параметры, передаваемые в кнопку
      return {
        name: 'Создаётся заказ...', // Текст на кнопке
        btnStyleName: ' new-order__btn-place', // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт
        btnColor: ' ', // Название  цветового решения ('__red', '__grey', )
      };
    },
    activePackageMethods() {
      let allPackageMethods = this.additionalPackageMethods.concat(
        this.defaultPackageMethods
      );
      return allPackageMethods.filter((item) => item.isActive === true);
    },
    orderItemSum() {
      return Math.round(this.orderSum + this.orderCommission + this.orderBelay);
    },

    products() {
      let res = [];

      for (let item of this.$store.getters['parsing/items']) {
        for (let el of item.items) {
          if (el.count !== 0) {
            res.push(el);
          }
        }
      }

      return res;
    },

    deliveryPrice() {
      return Math.round(
        this.$store.getters['parsing/totalPackagePrice'] +
          this.$store.getters['parsing/checkingPrice'] +
          this.$store.getters['parsing/volumePrice']
      );
    },

    orderSum() {
      return Math.round(this.$store.getters['parsing/productPrice']);
    },

    boxesCountArr() {
      let res = '';
      this.$store.getters['parsing/boxes'].forEach((item) => {
        res += item.count + ', ';
      });
      return res;
    },

    packageType() {
      let res = '';
      this.$store.getters['parsing/boxes'].forEach((item) => {
        res += item.type + ', ';
      });

      return res;
    },

    sendMethod() {
      return (
        this.$store.getters['parsing/sendMethod'].title +
        ' ' +
        '(' +
        this.$store.getters['parsing/sendMethod'].sendDate +
        ')'
      );
    },

    totalWeight() {
      return this.$store.getters['parsing/totalWeight'];
    },

    totalVolume() {
      return this.$store.getters['parsing/volume'];
    },

    urls() {
      let res = '';
      this.$store.getters['parsing/orders'].forEach((item) => {
        res += item.url + ', ';
      });

      return res;
    },

    boxSizes() {
      let bs = [];

      let res = '';

      this.$store.getters['parsing/boxes'].forEach((item) => {
        bs.push(item);
      });

      if (bs.length === 1) {
        res =
          bs[0].length +
          'см' +
          ' x ' +
          bs[0].width +
          'см' +
          ' x ' +
          bs[0].height +
          'см';
        return res;
      } else {
        for (let item of bs) {
          res +=
            item.length +
            'см' +
            ' x ' +
            item.width +
            'см' +
            ' x ' +
            item.height +
            'см' +
            ', ';
        }
        return res;
      }
    },

    boxesCount() {
      let bc = 0;
      this.$store.getters['parsing/boxes'].forEach((item) => {
        bc += Number(item.count);
      });

      return bc;
    },

    fullAddress() {
      let stateAddress = this.$store.getters['parsing/address'];
      if (stateAddress.type === 'default') {
        return (
          stateAddress.name +
          ' ' +
          stateAddress.country +
          ' ' +
          stateAddress.city +
          ' ' +
          stateAddress.street +
          ' ' +
          stateAddress.home
        );
      }

      if (stateAddress.type === 'custom') {
        return (
          stateAddress.firstname +
          ' ' +
          stateAddress.surname +
          ' ' +
          stateAddress.lastname +
          ' ' +
          stateAddress.country +
          ' ' +
          stateAddress.area +
          ' ' +
          stateAddress.city
        );
      }
    },

    deliveryAddress() {
      let address = this.$store.getters['parsing/defaultAdress'][0];
      return `${address.country}, ${address.city}, ${address.street}, ${address.home}`;
    },

    isOrderEdit() {
      return this.$store.getters['editableOrder/usingEditableOrder'];
    },

    orderId() {
      return this.$store.getters['editableOrder/editableOrderId'];
    },

    activePackageId() {
      const activePackage = this.$store.getters['parsing/activePackages'];
      return activePackage[0].id;
    },

    cleanItems() {
      const itemsFromStore = this.$store.getters['parsing/items'];

      function filterItemsWithCount(data) {
        return data.map((item) => ({
          ...item,
          items: item.items.filter((item) => item.count > 0),
        }));
      }

      const filteredData = filterItemsWithCount(itemsFromStore);

      return filteredData;
    },
  },

  methods: {
    async makeOrder() {
      if (!this.isSending) {
        this.isSending = true;
        const reqObj = {
          address_of_the_recipient: this.fullAddress || '',
          commission_percent: this.userCommission,
          commission_rub: this.orderCommission,
          delivery_address: this.deliveryAddress,
          name: this.clientName,
          price: this.$store.getters['parsing/totalPrice'] || 0,
          size_box: this.boxSizes || '',
          telegram_contact: this.user?.tag,
          telegram_number: this.$store.getters['parsing/phone'],
          email: this.$store.getters['parsing/email'],
          the_number_of_boxes: this.boxesCountArr || '',
          translation_course: 'RUB',
          url_for_product: this.urls,
          client_id: this.tg_id,
          comment: this.$store.getters['parsing/comments'],
          file: this.file,
          belay_sum: this.orderBelay,
          options: JSON.stringify({
            isBelay: this.$store.getters['parsing/isBelay'],
            user_tg_image: this.user.image,
            volume: this.totalVolume,
            weight: this.totalWeight,
            sendMethod: this.sendMethod,
            productSum: Math.round(this.$store.getters['parsing/productPrice']),
            commissionSum: Math.round(
              (this.$store.getters['parsing/productPrice'] * 10) / 100
            ),
            totalProductPrice: Math.round(
              this.orderSum + this.orderCommission + this.orderBelay
            ),
            sendAndPackagePrice:
              this.$store.getters['parsing/totalPackagePrice'],
            additionalPrice:
              this.$store.getters['parsing/checkingPrice'] +
              this.$store.getters['parsing/volumePrice'],
            package_id: this.activePackageId,
            deliveryPrice: this.$store.getters['parsing/deliveryPrice'],
            totalPrice: Math.round(this.deliveryPrice + this.orderItemSum),
            boxes: this.$store.getters['parsing/boxes'],
            isKnowBoxCount: this.$store.getters['parsing/isKnowBoxCount'],
            checking: this.$store.getters['parsing/checkMethods'],
            orderItems: this.cleanItems,
          }),
        };
        if (this.promo) {
          reqObj.promocode = this.promo.value;
        }

        this.products.forEach((item) => {
          item.delivery_china = this.deliveryPrice;
        });

        const formData = new FormData();

        Object.entries(reqObj).forEach(([key, value]) => {
          formData.set(key, value);
        });

        this.objectToFormData(this.products, 'products', formData);

        await this.$http
          .post('/orders', formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => {
            this.$notify({ type: 'success', message: 'Заказ успешно создан' });
            this.$store.commit('parsing/CLEAN_ORDER_DATA');
            if (Object.keys(this.activeTemplate).length > 0) {
              this.$http
                .delete(`/drafts/${this.activeTemplate.id}`)
                .then((response) => {
                  this.$store.commit(
                    'profileTemplate/DELETE_TEMPLATE',
                    this.activeTemplate.id
                  );
                  this.$store.commit('profileTemplate/CLEAN_ACTIVE_TEMPLATE');
                  this.$store.commit('parsing/CLEAN_ORDER_DATA');
                });
            }

            this.isSending = false;
            this.$router.push('/my_orders');
          })
          .catch((error) => {
            this.isSending = false;
          });
      }
    },
    async editOrder() {
      if (!this.isSending) {
        this.isSending = true;
        const reqObj = {
          address_of_the_recipient: this.fullAddress || '',
          commission_percent: this.userCommission,
          commission_rub: this.orderCommission,
          id: this.$store.getters['editableOrder/editableOrderId'],
          id_amo: this.$store.getters['editableOrder/editableOrderAmoId'],
          delivery_address: this.deliveryAddress,
          name: this.clientName,
          price: this.$store.getters['parsing/totalPrice'] || 0,
          size_box: this.boxSizes || '',
          telegram_contact: this.user?.tag,
          telegram_number: this.$store.getters['parsing/phone'],
          email: this.$store.getters['parsing/email'],
          the_number_of_boxes: this.boxesCountArr || '',
          products: this.products,
          translation_course: 'RUB',
          url_for_product: this.urls,
          client_id: this.tg_id,
          comment: this.$store.getters['parsing/comments'],
          file: this.file,
          belay_sum: this.orderBelay,
          options: JSON.stringify({
            isBelay: this.$store.getters['parsing/isBelay'],
            user_tg_image: this.user.image,
            volume: this.totalVolume,
            weight: this.totalWeight,
            sendMethod: this.sendMethod,
            productSum: Math.round(this.$store.getters['parsing/productPrice']),
            commissionSum: Math.round(
              (this.$store.getters['parsing/productPrice'] * 10) / 100
            ),
            totalProductPrice: Math.round(
              this.orderSum + this.orderCommission + this.orderBelay
            ),
            sendAndPackagePrice:
              this.$store.getters['parsing/totalPackagePrice'],
            additionalPrice:
              this.$store.getters['parsing/checkingPrice'] +
              this.$store.getters['parsing/volumePrice'],
            package_id: this.activePackageId,
            deliveryPrice: this.$store.getters['parsing/deliveryPrice'],
            totalPrice: Math.round(this.deliveryPrice + this.orderItemSum),
            boxes: this.$store.getters['parsing/boxes'],
            isKnowBoxCount: this.$store.getters['parsing/isKnowBoxCount'],
            checking: this.$store.getters['parsing/checkMethods'],
            orderItems: this.cleanItems,
          }),
        };

        function filterUndefinedFields(obj) {
          const filteredObj = {};
          for (const key in obj) {
            if (obj[key] !== undefined) {
              filteredObj[key] = obj[key];
            }
          }
          return filteredObj;
        }

        const filteredPayload = filterUndefinedFields(reqObj);

        await this.$http
          .patch(`/orders/${this.orderId}`, filteredPayload)
          .then((response) => {
            this.$notify({
              type: 'success',
              message: 'Данные успешно обновлены',
            });
            this.isSending = false;
            this.$router.push('/order/' + this.orderId);
            this.$store.commit('editableOrder/CLEAN_ACTIVE_EDITABLE_ORDER');
            this.$store.commit('parsing/CLEAN_ORDER_DATA');
          })
          .catch((error) => {
            this.isSending = false;
            this.$store.commit('editableOrder/CLEAN_ACTIVE_EDITABLE_ORDER');
            this.$store.commit('parsing/CLEAN_ORDER_DATA');
          });
      }
    },
    objectToFormData(obj, rootName, formData) {
      function appendFormData(data, root) {
        root = root || '';
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            appendFormData(data[i], root + '[' + i + ']');
          }
        } else if (typeof data === 'object' && data) {
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              if (root === '') {
                appendFormData(data[key], key);
              } else {
                appendFormData(data[key], `${root}[${key}]`);
              }
            }
          }
        } else {
          if (data !== null && typeof data !== 'undefined') {
            formData.append(root, data);
          }
        }
      }
      appendFormData(obj, rootName);
    },
  },
};
</script>

<style lang="scss" scoped>
.new-order {
  font-family: 'SF UI Display', sans-serif;

  &__block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__box {
    padding: 24px 24px 18px 24px;
  }

  &__box-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 18px 24px;
  }

  &__btn-place {
    width: 140px;
    height: 26px;
    font-family: 'SF UI Display', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    letter-spacing: 0.03em;
    text-decoration-line: underline;
    color: #292824;
    opacity: 0.9;

    &__make-order {
      display: flex;
      justify-content: space-between;
    }
    &__make-order-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
  }
}

.package-danger {
  margin: 12px 0 !important;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #6a6a6a;
  max-width: 80%;
  @media screen and (max-width: 480px) {
    margin-top: 6.25vw !important;
    margin-bottom: 0 !important;
    font-size: 2.92vw;
    max-width: 100%;
  }
}
.new-order__btn-ready {
  width: 100%;
}
</style>
