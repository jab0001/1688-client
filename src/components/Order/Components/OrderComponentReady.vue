<template>
  <div>
    <button
      v-if="!isSending"
      class="new-order__button new-order__btn-ready btn base-button text-dark"
      @click="makeOrder"
    >
      Рассчитать заказ
    </button>
    <button
      v-else
      disabled
      class="new-order__button new-order__btn-ready btn base-button text-dark"
    >
      Создаётся заказ...
    </button>
    <label class="new-order__label package-danger">
      Внимание! Итоговая цена может отличаться от текущей. Для уточнения всех
      деталей с вами лично свяжутся в Телеграм.
    </label>
    <div class="new-order__box-btns">
      <button
        class="new-order__button-prev btn base-button text-dark"
        @click="$emit('prevStep')"
      >
        Назад
      </button>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'OrderComponentReady',

  data() {
    return {
      isSending: false,
    };
  },
  props: {
    tg_id: String,
    api_key: String,
  },

  methods: {
    async makeOrder() {
      this.isSending = true;
      const reqObj = {
        address_of_the_recipient: this.fullAddress || '',
        api_key: this.api_key,
        channel: '',
        commission_percent: this.userCommissionPercent,
        commission_rub: this.$store.getters['parsing/commission'] || 0,
        delivery_address: 'РФ, Москва, деревня Ближние Прудище 34А',
        name: store.getters['auth/userName'] || '',
        price: this.$store.getters['parsing/totalPrice'] || 0,
        size_box: this.boxSizes || '',
        status_product: '',
        study_or_teacher: '',
        telegram_contact: `t.me/${store.getters['auth/userTelegramId']}` || '',
        telegram_number: this.$store.getters['parsing/phone'],
        email: this.$store.getters['parsing/email'],
        tg_id: store.getters['auth/userTelegramId'],
        the_number_of_boxes: this.boxesCountArr || '',
        products: this.products,
        translation_course: 'RUB',
        url_for_product: this.urls,
        client_id: store.getters['auth/userTelegramId'],
        options: JSON.stringify({
          isBelay: this.$store.getters['parsing/isBelay'],
          user_tg_image: store.getters['auth/userImage'],
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
          sendAndPackagePrice: this.$store.getters['parsing/totalPackagePrice'],
          additionalPrice:
            this.$store.getters['parsing/checkingPrice'] +
            this.$store.getters['parsing/volumePrice'],
          forManager: this.$store.getters['parsing/activePackages'],
          deliveryPrice: this.$store.getters['parsing/deliveryPrice'],
          totalPrice: Math.round(this.deliveryPrice + this.orderItemSum),
          boxes: this.$store.getters['parsing/boxes'],
          checking: this.$store.getters['parsing/productChecking'],
          orderItems: this.products,
        }),
      };

      if (store.getters.promo) {
        reqObj.promocode = store.getters.promoValue;
      } else {
        if (store.getters.promoLong) {
          reqObj.promocode = store.getters.promoLongValue;
        }
      }

      reqObj.products.forEach((item) => {
        item.delivery_china = this.deliveryPrice;
      });

      await this.$http
        .post('/orders', reqObj)
        .then((response) => {
          this.$notify({ type: 'success', message: 'Заказ успешно создан' });
          this.isSending = false;
          this.$router.push('/my_orders');
        })
        .catch((error) => {
          this.isSending = false;
        });
    },
  },

  computed: {
    userCommissionPercent() {
      if (store.getters.promo) {
        return store.getters.promoPercent;
      } else {
        if (store.getters.promoLong) {
          return store.getters.promoLongPercent;
        } else {
          return 10;
        }
      }
    },

    orderItemSum() {
      return Math.round(this.orderSum + this.orderCommission + this.orderBelay);
    },

    products() {
      let res = [];

      for (let item of this.$store.getters['parsing/items']) {
        for (let el of item.items) {
          if (!el.count) {
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

    orderCommission() {
      return Math.round(
        (this.$store.getters['parsing/productPrice'] * 10) / 100
      );
    },

    orderBelay() {
      if (this.$store.getters['parsing/isBelay']) {
        return Math.round(
          (this.$store.getters['parsing/productPrice'] * 2) / 100
        );
      } else {
        this.$store.commit('parsing/SET_BELAY_SUM', 0);
        return 0;
      }
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
        this.$store.getters['parsing/sendMethod'].send_date +
        ')'
      );
    },

    totalWeight() {
      return this.$store.getters['parsing/totalWeight'];
    },

    totalVolume() {
      return this.$store.getters['parsing/volume'];
    },

    userInfo() {
      if (store.getters['auth/user']) {
        return store.getters['auth/user'];
      }
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
  },
};
</script>

<style lang="scss" scoped>
.package-danger {
  margin: 30px 0 !important;
  color: #c91c1c;
  font-size: 18px;
  font-weight: 600;
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
