<template>
  <div class="new-order__tabFirst">
    <div class="new-order__howStartBlock">
      <div class="new-order__howStartBlock__textBlock">
        <a
          class="new-order__howStartBlock__textBlock__link"
          href="https://www.1688.com/"
          target="_blank"
        >
          Ссылка 1688.com
        </a>
        <div class="new-order__howStartBlock__textBlock__tips">
          Вставьте ссылку с сайта 1688.com с адресной строки или дождитесь пока
          расширение добавит их сюда
        </div>
      </div>
      <div v-if="tooltipToggled" class="new-order__howStartBlock__img"></div>
    </div>
    <div class="new-order__linkInsertBlock">
      <input
        class="new-order__input"
        type="text"
        @input="handleInput"
        placeholder="Вставьте ссылку с 1688.com сюда"
      />
      <img
        @click="tooltipToggle"
        class="new-order__tooltip"
        src="@/assets/img/icons/new-order-tooltip.svg"
      />
      <Btn :btnData="addItem_btn_data" @actionBtn="addItem" />
      <Btn :btnData="nextStep_btn_data" @actionBtn="$emit('nextStep')" />
    </div>
    <div class="new-order__linkInsertComments">
      <div class="new-order__linkInsertComments__info">
        <div class="new-order__linkInsertComments__text">
          ссылки с телефонной версии или с мобильного приложения пока не
          поддерживаются
        </div>
        <div class="new-order__linkInsertComments__text">
          если у вас несколько товаров, то заносите товары по очереди
        </div>
      </div>
    </div>
    <template v-if="orders.length">
      <div class="new-order__list-items">
        <OrderItem
          v-for="(order, index) in orders"
          @deleteItem="deleteOrderItem"
          @changeCount="changeCount"
          :key="order.url"
          :idItem="index"
          :order="order"
          :courses="courses"
        />
      </div>
    </template>
    <Loader v-if="loader" />
  </div>
</template>

<script>
// import компонент кнопки
import Btn from '@/components/ButtonUniver.vue';
import OrderItem from '@/components/Order/OrderItem.vue';
//  импортируем крутилку лоадера
import Loader from '@/components/Loader.vue';

export default {
  name: 'OrderComponentFirst',
  components: {
    Btn,
    OrderItem,
    Loader,
  },
  props: [
    'courses',
    'nextStep_btn_data',
    'orders',
    'activeTemplate',
    'activeEditableOrder',
    'changeCourseByPrice',
    'editableOrderIsUsed'
  ],
  emits: ['nextStep'],
  data() {
    return {
      loader: false,
      totalItems: [],
      userMinPrice: 50000,
      tooltipToggled: false,
    };
  },

  computed: {
    addItem_btn_data() {
      // Параметры, передаваемые в кнопку
      return {
        name: 'Добавить еще товар', // Текст на кнопке
        btnStyleName: ' addItemBtn', // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт
        btnColor: '__grey', //  Название  цветового решения ('__red', '__grey', )
      };
    },
  },
  methods: {
    async handleInput(e) {
      // функция обработки input для ссылки на товары
      if (/.1688\.com\//.test(e.target.value)) {
        this.loader = true;
        await this.$http
          .post('/parser/parse', {
            url: e.target.value,
          })
          .then((response) => {
            this.loader = false;
            e.target.value = '';
            let newOrders = [...this.orders, response.data.data];
            this.$store.commit('parsing/SET_ORDERS', newOrders);
            this.$notify({
              type: 'success',
              message: 'Данные успешно получены!',
            });
          })
          .catch((error) => {
            this.loader = false;
            e.target.value = '';
            this.$notify({
              type: 'error',
              message: 'Ошибка получения данных! Попробуйте еще раз',
            });
          });
      } else {
        e.target.value = '';
        this.$notify({
          type: 'error',
          message: 'Ошибка получения данных! Попробуйте еще раз',
        });
      }
    },

    //функция обработки изменения количества товаров в заказе
    changeCount(val) {
      this.totalItems = [...this.totalItems, val];
      if (this.editableOrderIsUsed) {
        this.totalItems = [...this.$store.getters['parsing/items'], val];
      }
      function removeDuplicates(arr) {
        const uniqueArray = arr.reduce((accumulator, currentObject) => {
          const existingIndex = accumulator.findIndex(
            (obj) => obj.id === currentObject.id
          );

          if (existingIndex !== -1) {
            accumulator[existingIndex] = currentObject;
          } else {
            accumulator.push(currentObject);
          }

          return accumulator;
        }, []);

        return uniqueArray;
      }
      this.totalItems = removeDuplicates(this.totalItems);
    },
    //функция удаления товара из заказа
    deleteOrderItem(url) {
      this.orders = this.orders.filter((item) => item.url !== url);
      this.totalItems = this.totalItems.filter((item) => item.id !== url);
    },
    addItem() {
      // отрабатываем нажатие кнопки "Добавить заказ"
      console.log('addItem Btn pressed');
    },

    tooltipToggle() {
      this.tooltipToggled = !this.tooltipToggled;
    },
  },
  watch: {
    ordersFromVuex: function (newOrders) {
      this.orders = newOrders;
    },
    usedPromo(val) {
      if (val) {
        if (JSON.parse(localStorage.getItem('user')).data.client.promo) {
          this.userMinPrice = JSON.parse(
            localStorage.getItem('user')
          ).data.client.promo.minPrice;
        } else {
          this.userMinPrice = JSON.parse(
            localStorage.getItem('user')
          ).data.client.long_promo.minPrice;
        }
      }
    },

    userMinPrice: {
      deep: true,
      handler(val) {
        this.$forceUpdate();
      },
    },

    orders: {
      deep: true,
      handler(val) {
        this.$store.commit('parsing/SET_ORDERS', val);
        let arr = [];
        for (let item of val) {
          arr = [...arr, item.url];
          this.$store.commit('parsing/SET_PRODUCT_URL', arr);
        }
      },
    },

    totalItems: {
      deep: true,
      handler(val, oldVal) {
        this.$store.commit('parsing/SET_ITEMS', val);
        this.$emit('changeCourseByPrice')
      },
    },
  },

  updated() {
    if (Object.keys(this.activeTemplate).length > 0) {
      if (
        this.$store.getters['parsing/draftTotalPrice'] !==
        this.$store.getters['parsing/productPrice']
      ) {
        this.$store.commit(
          'parsing/SET_PRICE',
          this.$store.getters['parsing/draftTotalPrice']
        );
      }
    }
  },
};
</script>

<style lang="scss">
.new-order {
  &__tabFirst {
    width: 100%;
    padding: 30px 26px 40px 25px;
  }

  &__howStartBlock {
    width: 100%;
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    margin-bottom: 19px;

    &__textBlock {
      width: 45%;
      display: flex;
      flex-direction: column;
      margin-right: 12px;

      &__link {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        margin-bottom: 4px;
        text-decoration: none;
      }

      &__tips {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
      }
    }

    &__img {
      width: 54%;
      height: 65px;
      background-image: url(~/img/order/howStart.png);
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: left center;
      min-height: 20px;
    }
  }

  &__input {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    align-items: center;
    letter-spacing: 0.03em;
    height: 100%;
    width: 100%;
    max-width: 365px;
    margin: 0 20px 0 0;
    border: 1px solid #d9dce2;
    border-radius: 3px;
    padding: 8px 12px;
  }

  &__linkInsertBlock {
    padding: 0;
    width: 100%;
    height: 26px;
    display: flex;
    margin-bottom: 8px;

    &__btnPlace {
      width: 125px;
      height: 100%;
      margin-right: 17px;
      @media screen and (min-width: 1801px) {
        width: 160px;
      }
      @media screen and (min-width: 1701px) and (max-width: 1800px) {
        width: 155px;
      }
      @media screen and (min-width: 1601px) and (max-width: 1700px) {
        width: 140px;
      }
      @media screen and (min-width: 1441px) and (max-width: 1600px) {
        width: 100%;
      }
      @media screen and (min-width: 1201px) and (max-width: 1440px) {
        width: 100%;
      }
    }
  }

  &__linkInsertComments {
    width: 100%;

    &__info {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    &__text {
      width: 100%;
      font-style: normal;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      opacity: 0.3;
    }
  }

  &__tooltip {
    margin-right: 20px;
    cursor: pointer;
  }

  &__list-items {
    margin-top: 24px;
  }
}
.addItemBtn {
  height: 100%;
  width: 100%;
}
.nextTabBtn {
  height: 100%;
  width: 100%;
}
</style>
