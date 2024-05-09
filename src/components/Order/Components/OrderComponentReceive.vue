<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark">
          Укажите получателя и адрес для доставки груза
        </label>
        <div class="new-order__methods-container" v-if="!forEdit">
          <div class="new-order__section">
            <div class="title">Наши склады:</div>
          </div>
          <div
            class="method-item"
            :class="{ active: stock.isActive }"
            :key="stock.id"
            v-for="stock in stocks"
          >
            <div class="type">
              {{ stock.name }}
            </div>
            <div class="address">
              {{ stock.country }}, {{ stock.city }}, {{ stock.street }}
              {{ stock.home }}
            </div>
            <label class="switch">
              <input
                v-model="stock.isActive"
                @change="uncheckOther(stock)"
                type="checkbox"
              />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="new-order__section" v-if="customAddress.length">
            <div class="title">Ваши адреса:</div>
          </div>
          <div
            class="method-item"
            :class="{ active: stock.isActive }"
            :key="stock.id"
            v-for="stock in customAddress"
          >
            <div class="type">
              {{ stock.firstname }}
              {{ stock.surname }}
              {{ stock.lastname }}
            </div>
            <div class="address">
              {{ stock.country }}
              {{ stock.city }}
            </div>
            <label class="switch">
              <input
                v-model="stock.isActive"
                @change="uncheckOther(stock)"
                type="checkbox"
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="new-order__address-container" v-else>
          <div class="address-section">
            <div class="section-header">
              <div class="title title-center">Получатель</div>
            </div>
            <div class="form-items">
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="surname"
                placeholder="Фамилия"
              />
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="firstname"
                placeholder="Имя"
              />
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="lastname"
                placeholder="Отчество"
              />
            </div>
          </div>
          <div class="address-section">
            <div class="section-header">
              <div class="title">Адрес доставки</div>
            </div>
            <div class="form-items">
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="country"
                placeholder="Страна"
              />
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="area"
                placeholder="Край или область"
              />
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="city"
                placeholder="Город"
              />
            </div>
            <div class="form-items-2">
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="phone"
                placeholder="Телефон"
              />
              <input
                type="text"
                class="form-control rounded-sm text-dark"
                v-model="passport"
                placeholder="Номер и серия паспорта"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="new-order__button new-order__btn-ready btn base-button text-dark"
        @click="addAddress"
        v-if="forEdit"
      >
        Добавить адрес
      </button>
      <div v-if="forEdit" class="new-order__address-btn-container">
        <div class="title-container">
          <div class="address-icon">
            <svg class="flex-none" width="26" height="25">
              <path
                d="M6.136 9.97a3.842 3.842 0 0 0 3.834 3.835 3.842 3.842 0 0 0 3.835-3.835A3.842 3.842 0 0 0 9.97 6.136 3.842 3.842 0 0 0 6.136 9.97zm6.649 0a2.816 2.816 0 0 1-2.815 2.814A2.816 2.816 0 0 1 7.156 9.97 2.816 2.816 0 0 1 9.97 7.156a2.816 2.816 0 0 1 2.815 2.814z"
              ></path>
              <path
                d="M4.572 18.116c-2.358-2.979-3.552-5.624-3.552-7.859v-.292c0-4.936 4.014-8.95 8.95-8.95a8.911 8.911 0 0 1 8.884 7.869l1.087.989C19.889 4.423 15.44 0 9.97 0 4.474 0 0 4.475 0 9.97v.292c0 2.794 1.635 6.09 4.854 9.791a43.771 43.771 0 0 0 4.604 4.532v-1.348c-1.133-1.01-3.117-2.886-4.886-5.121zm14.246.856h-2.045v2.045h2.045v-2.045z"
              ></path>
              <path
                d="M17.767 12.051l-7.238 6.608.687.753.195-.18.856-.783v4.449a2.264 2.264 0 0 0 2.26 2.26h6.475a2.264 2.264 0 0 0 2.26-2.26V18.45l.856.784.195.18.687-.754-7.233-6.608zm4.48 5.695v5.152c0 .682-.558 1.24-1.24 1.24h-6.475c-.681 0-1.24-.558-1.24-1.24v-5.377l.17-.154 3.967-3.619.343-.313.344.313 3.967 3.619.17.154v.225h-.006z"
              ></path>
            </svg>
          </div>
          <div class="address-btn__text">Или используйте уже текущий адрес</div>
        </div>
        <button class="address-btn" @click="forEdit = false">К адресам</button>
      </div>

      <div v-else class="new-order__address-btn-container">
        <div class="title-container">
          <div class="address-icon">
            <svg class="flex-none" width="26" height="25">
              <path
                d="M6.136 9.97a3.842 3.842 0 0 0 3.834 3.835 3.842 3.842 0 0 0 3.835-3.835A3.842 3.842 0 0 0 9.97 6.136 3.842 3.842 0 0 0 6.136 9.97zm6.649 0a2.816 2.816 0 0 1-2.815 2.814A2.816 2.816 0 0 1 7.156 9.97 2.816 2.816 0 0 1 9.97 7.156a2.816 2.816 0 0 1 2.815 2.814z"
              ></path>
              <path
                d="M4.572 18.116c-2.358-2.979-3.552-5.624-3.552-7.859v-.292c0-4.936 4.014-8.95 8.95-8.95a8.911 8.911 0 0 1 8.884 7.869l1.087.989C19.889 4.423 15.44 0 9.97 0 4.474 0 0 4.475 0 9.97v.292c0 2.794 1.635 6.09 4.854 9.791a43.771 43.771 0 0 0 4.604 4.532v-1.348c-1.133-1.01-3.117-2.886-4.886-5.121zm14.246.856h-2.045v2.045h2.045v-2.045z"
              ></path>
              <path
                d="M17.767 12.051l-7.238 6.608.687.753.195-.18.856-.783v4.449a2.264 2.264 0 0 0 2.26 2.26h6.475a2.264 2.264 0 0 0 2.26-2.26V18.45l.856.784.195.18.687-.754-7.233-6.608zm4.48 5.695v5.152c0 .682-.558 1.24-1.24 1.24h-6.475c-.681 0-1.24-.558-1.24-1.24v-5.377l.17-.154 3.967-3.619.343-.313.344.313 3.967 3.619.17.154v.225h-.006z"
              ></path>
            </svg>
          </div>
          <div class="address-btn__text">Добавьте новый адрес</div>
        </div>
        <button class="address-btn" @click="forEdit = true">Новый адрес</button>
      </div>
    </div>

    <div class="new-order__box-btns">
      <button
        class="new-order__button-prev btn base-button text-dark"
        @click="$emit('prevStep')"
      >
        Назад
      </button>
      <button
        class="new-order__button btn base-button text-dark"
        @click="nextStep"
      >
        Далее
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderComponentReceive',
  data() {
    return {
      stocks: [
        {
          id: 1,
          city: 'Москва',
          country: 'РФ',
          home: '22',
          type: 'default',
          street: 'Подольских Курсантов',
          name: 'Наш склад фулфилмента',
          isActive: false,
        },
      ],
      firstname: '',
      surname: '',
      lastname: '',
      country: '',
      area: '',
      city: '',
      phone: '',
      passport: '',
      customAddress: [],
      forEdit: false,
    };
  },

  mounted() {
    if(this.$store.getters['profileTemplate/templateIsUsed']) {
      this.stocks = this.stocksFromVuex;
      this.customAddress = this.customAddressFromVuex;

      let hasActive = this.allAddresses.some((item) => item.isActive);
      if(hasActive) {
        let activeItem = this.allAddresses.find((item) => item.isActive);
        this.$store.commit('parsing/SET_ADDRESS', activeItem);
      } else {
        this.$store.commit('parsing/SET_ADDRESS', {});
      }
    }
  },

  computed: {
    stocksFromVuex(){
      return this.$store.getters['profileTemplate/activeTemplate'].stocks;
    },

    customAddressFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate'].customAddress;
    },

    steps() {
      return this.$store.getters['parsing/steps'];
    },

    allAddresses() {
      return [...this.stocks, ...this.customAddress];
    },
  },

  watch: {
    stocksFromVuex: function(nv) {
      this.stocks = nv;
    },

    customAddressFromVuex: function(nv) {
      this.customAddress = nv;
    },

    stocks: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_STOCKS', val)
      }
    },

    customAddress: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_CUSTOM_ADDRESS', val)
      }
    }
  },

  methods: {
    nextStep() {
      if (Object.keys(this.$store.getters['parsing/address']).length) {
        this.steps.find((item) => item.name === 'OrderComponentReceive').isReady = true;
        this.$store.commit('parsing/SET_STEPS', this.steps);
        this.$emit('nextStep');
      } else {
        this.$notify({
          type: 'warning',
          message: 'Необходимо выбрать адрес доставки',
        });
        return;
      }
    },

    addAddress() {
      let newAddress = {
        id: this.stocks[this.stocks.length - 1].id + 1,
        firstname: this.firstname,
        surname: this.surname,
        lastname: this.lastname,
        country: this.country,
        area: this.area,
        city: this.city,
        phone: this.phone,
        passport: this.passport,
        type: 'custom',
      };

      this.customAddress = [...this.customAddress, newAddress];

      this.firstname = '';
      this.surname = '';
      this.lastname = '';
      this.country = '';
      this.area = '';
      this.city = '';
      this.phone = '';
      this.passport = '';
    },

    uncheckOther(stock) {
      if (stock.isActive) {
        this.allAddresses.forEach((s) => {
          if (s.id !== stock.id) {
            s.isActive = false;
          }
        });
        this.$store.commit('parsing/SET_ADDRESS', stock);
      } else {
        this.$store.commit('parsing/SET_ADDRESS', {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-order__address-btn-container {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 26px;
  color: #393939;
  background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  @media screen and (max-width: 480px) {
    margin-top: 1.67vw;
    padding: 4.17vw;
    gap: 4.17vw;
    flex-wrap: wrap;
  }
  .title-container {
    display: flex;
    align-items: center;
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
    }
    .address-icon {
      width: 26px;
      height: 25px;
      display: flex;
      margin-right: 8px;
      @media screen and (max-width: 480px) {
        width: 9.42vw;
        height: 9.21vw;
        margin-right: 1.67vw;
      }
    }
  }
  .address-btn {
    border: 1px solid #393939;
    padding: 10px 20px !important;
    border-radius: 4px;
    background: transparent;
    @media screen and (max-width: 480px) {
      font-size: 0.625rem;
      padding: 0.5rem 1.25rem;
      border-radius: 0.83vw;
      flex: 1;
    }
    &:hover {
      background: #ffffff;
    }
  }
}
.new-order__btn-ready {
  width: 100%;
  margin-top: 10px !important;
}
.new-order__methods-container {
  display: flex;
  flex-direction: column;
  .new-order__section {
    margin-bottom: 15px;
    @media screen and (max-width: 480px) {
      margin-bottom: 3.13vw;
    }
    .title {
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #d3dce6;
    }
  }
  .method-item {
    padding: 14px;
    color: #393939;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    cursor: pointer;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    @media screen and (max-width: 480px) {
      padding: 4.17vw;
      border-radius: 0.83vw;
      gap: 4.17vw;
      flex-wrap: wrap;
      font-size: 2.92vw;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &.active {
      background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    }
    .type {
      padding-left: 10px;
      @media screen and (max-width: 480px) {
        padding-left: 0;
      }
    }
    .price {
      display: flex;
      align-items: center;
      .count-container::before {
        content: 'X';
        margin: 0 8px;
      }
      .count-container {
        display: flex;
        align-items: center;
      }
    }
    .desc {
      max-width: 284px;
      width: 100%;
      text-align: center;
    }
  }
}
.new-order__address-container {
  display: flex;
  flex-direction: column;
  .address-section {
    margin-bottom: 4px;
    .section-header {
      margin-bottom: 4px;
      .title {
        @media screen and (max-width: 480px) {
          font-size: 2.92vw;
          text-align: left !important;
        }
      }
      .title-center {
        text-align: center;
      }
    }
    .form-items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 4px;
      @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 0.83vw;
      }
    }
    & .form-control {
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
      }
    }
    .form-items-2 {
      margin-top: 6px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 4px;
      @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 0.83vw;
      }
    }
  }
}
.new-order__button {
  &-prev {
    margin-top: 60px;
    @media screen and (max-width: 480px) {
      margin-top: 8.33vw;
      margin-right: 0;
    }
  }
  @media screen and (max-width: 480px) {
    margin-top: 0;
  }
}
</style>
