<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark">
          Укажите получателя и адрес для доставки груза
        </label>
        <div class="new-order__methods-container" v-if="!forEdit">
          <div class="new-order__section">
            <div class="title">Наши склады</div>
            <div class="divider-line"></div>
          </div>
          <div
            class="method-item"
            :class="{ active: stock.isActive }"
            :key="stock.id"
            v-for="stock in defaultAdress"
          >
            <div class="type">
              {{ stock.name }}
            </div>
            <div class="address">
              {{ addressTransformation(stock) }}
            </div>
            <label class="label-chooseAdress">
              <input
                v-model="stock.isActive"
                @change="chooseAdress(stock)"
                type="checkbox"
                class="d-none"
              />
              <div class="checkButton" v-if="stock.isActive">Выбрано</div>
              <div class="uncheckButton" v-else>Выбрать</div>
            </label>
          </div>
        </div>
        <div v-else>
          <div class="new-order__section mb-4">
            <div class="title">Другой адрес</div>
            <div class="divider-line"></div>
          </div>
          <div class="new-order__address-container">
            <div class="address-section">
              <div class="section-header">
                <div class="title">Получатель</div>
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
      </div>

      <div v-if="forEdit" class="d-flex mt-4">
        <button class="address-btn" @click="addAddress" v-if="forEdit">
          Добавить адрес
        </button>
        <button class="address-btn-gray" @click="forEdit = false">
          К адресам
        </button>
      </div>

      <div v-else>
        <div>
          <div class="new-order__section">
            <div class="title">Другой адрес</div>
            <div class="divider-line"></div>
          </div>
        </div>
        <div class="new-order__methods-container">
          <div class="new-order__section mt-3" v-if="customAddress.length">
            <div
              class="method-item"
              :class="{ active: stock.isActive }"
              :key="stock.id"
              v-for="stock in customAddress"
            >
              <div class="address-icon">
                <img src="../../../assets/img/order/new-address.svg" />
              </div>
              <div class="type">
                {{ stock.firstname }}
                {{ stock.surname }}
                {{ stock.lastname }}
              </div>
              <div class="address">
                {{ stock.country }}
                {{ stock.city }}
              </div>
              <label>
                <input
                  v-model="stock.isActive"
                  @change="chooseAdress(stock)"
                  type="checkbox"
                  class="d-none"
                />
                <div class="checkButton" v-if="stock.isActive">Выбрано</div>
                <div class="uncheckButton" v-else>Выбрать</div>
              </label>
            </div>
          </div>
        </div>

        <div class="new-order__address-btn-container">
          <div class="title-container">
            <div class="address-icon">
              <img src="../../../assets/img/order/new-address.svg" />
            </div>
            <div class="address-btn__text">Новый адрес</div>
          </div>
          <button class="address-btn" @click="forEdit = true">Добавить</button>
        </div>
      </div>
    </div>

    <div class="new-order__box-btns">
      <div class="new-order__btn-place">
        <Btn :btnData="prevStep_btn_data" @actionBtn="$emit('prevStep')" />
      </div>
      <div class="new-order__btn-place">
        <Btn :btnData="nextStep_btn_data" @actionBtn="$emit('nextStep')" />
      </div>
    </div>
  </div>
</template>

<script>
// import компонент кнопки
import Btn from '@/components/ButtonUniver.vue';

import store from '@/store';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'OrderComponentReceive',
  props: ['nextStep_btn_data', 'prevStep_btn_data'],
  emits: ['prevStep', 'nextStep'],
  components: {
    Btn,
  },
  data() {
    return {
      userAddressCustom: '',
      firstname: '',
      surname: '',
      lastname: '',
      country: '',
      area: '',
      city: '',
      phone: '',
      passport: '',
      forEdit: false,
    };
  },
  computed: {
    // получаем данные из store Vuex
    ...mapState({
      stocks: (state) => state.parsing.stocks,
    }),
    ...mapGetters({
      customAddress: 'parsing/customAddress',
      defaultAdress: 'parsing/defaultAdress',
      useHomeAddress: 'layout/useHomeAddress',
      userAddress: 'auth/userAddress',
    }),
    allAddresses() {
      return [...this.stocks, ...this.customAddress];
    },
  },

  mounted(){
    if(!this.isforEdit){
      this.$store.commit('layout/SET_USE_HOME_ADDRESS', JSON.parse(localStorage.getItem('isChecked')));
    }
    this.userAddressCustom = this.userAddress;
  },

  mounted(){
    this.addUserAddress();
  },

  methods: {
    addAddress() {
      this.forEdit = false;
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

      this.$store.commit('parsing/ADD_NEW_STOCK_ADDRESS', newAddress);

      this.firstname = '';
      this.surname = '';
      this.lastname = '';
      this.country = '';
      this.area = '';
      this.city = '';
      this.phone = '';
      this.passport = '';
    },

    addUserAddress(){
      let userAddress = this.userAddressCustom.split(',');
      let newUserAddress = {
        id: this.stocks[this.stocks.length - 1].id + 1,
        city: userAddress[1],
        country: userAddress[0],
        home: userAddress[3],
        type: 'default',
        street: userAddress[2],
        name: 'Ваш адрес',
        isActive: false,
      };

      if(this.stocks.length == 1 && this.useHomeAddress == true){
        this.$store.commit('parsing/ADD_NEW_STOCK_ADDRESS', newUserAddress);
      }
    },

    addressTransformation(stock) {
      if (stock.isUserAddress) {
        this.userAddress = store.getters['auth/userAddress'];
        return this.userAddress;
      }
      return `${stock.country}, ${stock.city}, ${stock.street}
              ${stock.home}`;
    },

    chooseAdress(stock) {
      this.$store.commit('parsing/SET_ACTIVE_ADDRESS', stock);
    },
  },
  watch: {
    customAddressFromVuex: function (nv) {
      this.customAddress = nv;
    },

    customAddress: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_CUSTOM_ADDRESS', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.new-order {
  font-family: 'SF UI Display', sans-serif;

  &__box {
    padding: 24px 24px 18px 24px;
  }

  &__label {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
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
  }

  .divider-line {
    width: 100%;
    height: 1px;
    background-color: #d3dce6;
    margin-top: 12px;
  }
  .checkButton {
    cursor: pointer;
    background: #000000;
    color: #fadd56;
    padding: 5px 20px;
    opacity: 0.9;
    text-decoration: underline;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    border-radius: 3px;
    border: none;
    width: 115px;
    text-align: center;
  }
  .uncheckButton {
    cursor: pointer;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    color: #000000;
    padding: 5px 20px;
    opacity: 0.9;
    text-decoration: underline;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    border-radius: 3px;
    border: none;
    width: 115px;
    text-align: center;
  }
}

.new-order__address-btn-container {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid #d9dce2;
  max-width: 370px;
  align-items: center;
  padding: 10px 26px;
  color: #393939;
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
}
.address-btn {
  background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  color: #000000;
  padding: 8px 40px;
  opacity: 0.9;
  text-decoration: underline;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-radius: 3px;
  border: none;
}

.address-btn-gray {
  background: #d9dce2;
  color: #000000;
  padding: 8px 40px;
  opacity: 0.9;
  text-decoration: underline;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-radius: 3px;
  border: none;
  margin-left: 20px;
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
    
    label{
      margin: 0;
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
  max-width: 632px;
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
      height: 33px;
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
.label-chooseAdress{
  margin-bottom: 0;
}
</style>
