<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark" for="url_product"
          >Вставьте одну или несколько ссылок на товар
          <div
            v-tooltip="
              'Если у вас несколько товаров, то заносите по очереди ссылки'
            "
            style="width: 18px; cursor: help; display: flex; height: 18px"
          >
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="18px"
              height="18px"
              viewBox="0 0 416.979 416.979"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
		c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
		c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
		c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
		c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
                />
              </g>
            </svg>
          </div>
        </label>
        <div ref="error" class="new-order__error">
          Вставьте ссылку на товар с сайта 1688.com
        </div>
        <input
          class="new-order__input"
          type="text"
          id="url_product"
          @input="handleInput"
          placeholder="Вставьте ссылку с 1688.com сюда"
        />
      </div>
    </div>

    <div class="new-order__box">
      <button
        class="new-order__button btn base-button text-dark"
        @click="nextStep"
      >
        Далее
      </button>
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
        />
      </div>
    </template>
    <Loader v-if="loader" />
  </div>
</template>

<script>
import OrderItem from '@/components/Order/OrderItem.vue';
import Loader from '@/components/Loader.vue';
import store from '@/store';

export default {
  name: 'OrderComponentParsing',
  data() {
    return {
      courses: {},
      orders: [],
      loader: false,
      totalItems: [],
      userMinPrice: 50000,
    };
  },
  components: {
    OrderItem,
    Loader,
  },

  computed: {
    ordersFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate'].orders;
    },

    totalItemFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate'].totalItems;
    },

    steps() {
      return this.$store.getters['parsing/steps'];
    },

    usedPromo() {
      return this.$store.getters['parsing/usedPromo'];
    },

    td_id() {
      return store.getters['auth/userTelegramId'];
    },

    auth_key() {
      return store.getters['auth/userAuthKey'];
    },
  },

  watch: {
    ordersFromVuex: function (newOrders) {
      this.orders = newOrders;
    },
    totalItemsFromVuex: function (newTotalItems) {
      this.totalItems = newTotalItems;
    },
    usedPromo(val) {
      if (val) {
        if (store.getters['auth/userLongPromo']) {
          this.userMinPrice = store.getters['auth/userLongPromoMinPrice'];
        }
      }
    },

    userMinPrice: {
      deep: true,
      handler(val) {
        this.$forceUpdate();
      },
    },

    totalItems: {
      deep: true,
      handler(val) {
        this.$store.commit('parsing/SET_ITEMS', val);
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
  },

  async mounted() {
    await this.getExchangeRates();
    if (store.getters['auth/userLongPromo']) {
      this.userMinPrice = store.getters['auth/userLongPromoMinPrice'];
    } else if (store.getters['auth/userPromo']) {
      this.userMinPrice = store.getters['auth/userPromoMinPrice'];
    } else {
      this.userMinPrice = 50000;
    }

    if (this.$route.query.ext_id) {
      await this.getExtensionOrders(this.$route.query.ext_id);
    }
  },

  methods: {
    changeCount(val) {
      this.totalItems = [...this.totalItems, val];
      this.calcPrice();
    },

    async getExtensionOrders(ext_id) {
      this.loader = true;
      await this.$http.get(`/orders/extension/${ext_id}`).then((response) => {
        this.orders = [...this.orders, ...response.data.data];
        this.loader = false;
        this.$notify({
          type: 'success',
          message: 'Данные успешно получены!',
        });
      });
    },

    calcPrice() {
      let filteredArray = [];
      this.totalItems.forEach((obj) => {
        let index = filteredArray.findIndex((elem) => elem.id === obj.id);
        if (index === -1) {
          filteredArray.push(obj);
        } else {
          filteredArray.splice(index, 1, obj);
        }
      });

      this.totalItems = filteredArray;

      let totalPrice = 0;

      for (let item of this.totalItems) {
        for (let el of item.items) {
          totalPrice += el.price * el.modelCount * this.courses.cny_rub;
        }
      }
      this.$store.commit('parsing/SET_PRICE', totalPrice);
    },

    nextStep() {
      if (
        Number(this.$store.getters['parsing/productPrice']) > this.userMinPrice
      ) {
        this.steps.find(
          (item) => item.name === 'OrderComponentParsing'
        ).isReady = true;
        this.$store.commit('parsing/SET_STEPS', this.steps);
        this.$emit('nextStep');
      } else {
        this.$notify({
          type: 'warning',
          message: `Сумма заказа должна быть больше ${this.userMinPrice}`,
        });
      }
    },

    async handleInput(e) {
      if (/.1688\.com\//.test(e.target.value)) {
        this.loader = true;
        await this.$http
          .post('/parser/parse', {
            url: e.target.value,
          })
          .then((response) => {
            this.loader = false;
            this.orders = [...this.orders, response.data.data];
            this.$notify({
              type: 'success',
              message: 'Данные успешно получены!',
            });
          })
          .catch((error) => {
            this.loader = false;
            e.target.value = '';
          });
      } else {
        e.target.value = '';
        this.$refs.error.classList.add('active');
      }
    },
    deleteOrderItem(url) {
      this.orders = this.orders.filter((item) => item.url !== url);
      this.totalItems = this.totalItems.filter((item) => item.id !== url);
      this.calcPrice();
    },
    async getExchangeRates() {
      await this.$http.get(`/settings`).then((response) => {
        this.courses = response.data.data.settings.courses;
      });
    },
  },
};
</script>

<style lang="scss">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
