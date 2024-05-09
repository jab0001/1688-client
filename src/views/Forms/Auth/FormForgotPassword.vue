<template>
  <form class="restore">
    <router-link
      v-if="!modal && !newPhone"
      class="restore__link"
      to="/auth/login"
    >
      <img src="@/assets/img/icons/arrow-back.svg" />
    </router-link>
    <a
      href="#"
      v-if="modal && !newPhone"
      @click="$emit('closeModals')"
      class="restore__link"
    >
      <img src="@/assets/img/icons/arrow-back.svg" />
    </a>

    <div>
      <h2 class="restore__title">
        {{ changePhone ? 'Сменить телефон' : 'Поменять пароль' }}
      </h2>
      <p class="restore__description">
        Введите номер телефона, который был привязан к вашему FLG ID
      </p>
    </div>

    <ul class="restore__list">
      <li class="restore__item">
        <div class="restore__select-wrapper">
          <select class="restore__select" v-model="selectedCountryCode">
            <option value="+7">+7</option>
            <option value="+1">+1</option>
            <option value="+33">+33</option>
          </select>
        </div>

        <input
          ref="phone"
          type="text"
          v-mask="`(###) ###-##-##`"
          v-model="formModel.phone"
          :class="isValidPhone"
          placeholder="999 9999"
          class="restore__input-phone registartion__input profile-order__input form-control rounded-sm text-dark"
          required
          @click="resetValidation"
          @blur="checkEmpty"
        />
      </li>
    </ul>

    <button
      @click.prevent="onSubmitHandler"
      :disabled="!allowedToSendCode"
      class="restore__btn restore__btn-sent"
    >
      {{ smsAuthTimeout ? `Повтор через ${smsAuthTimeout} сек.` : (newPhone ? 'Сменить телефон' : 'Отправить код')}}
    </button>
    <router-link
      v-if="!modal && !newPhone"
      class="restore__link"
      to="/auth/login"
      >Вспомнил пароль</router-link
    >
    <a
      href="#"
      v-if="modal && !newPhone"
      class="restore__link"
      @click="$emit('closeModals')"
      >Вспомнил пароль</a
    >
  </form>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    changePhone: {
      type: Boolean,
      default: false,
    },
    newPhone: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formModel: {
        phone: '',
      },
      selectedCountryCode: '+7',
    };
  },
  computed: {
    ...mapGetters({
      smsAuthTimeout: 'sms/smsAuthTimeoutSeconds',
    }),
    isValidPhone() {
      return this.formModel.phone === ''
        ? ''
        : this.formModel.phone.length === 15
        ? 'is-valid'
        : 'is-invalid';
    },
    allowedToSendCode() {
      return !this.smsAuthTimeout
    }
  },
  methods: {
    ...mapActions({
      runAuthSmsTimer: 'sms/runAuthSmsTimer'
    }),
    checkEmpty(event) {
      event.target.value === '' ? event.target.classList.add('is-invalid') : '';
    },
    resetValidation(event) {
      event.target.classList.remove('is-invalid');
    },
    isValid() {
      return Object.keys(this.$refs)
        .map((ref) => {
          if (this.$refs[ref].value === '') {
            this.$refs[ref].classList.add('is-invalid');
          }
          return this.$refs[ref].value;
        })
        .every((el) => el);
    },
    onSubmitHandler() {
      const data = {
        phone: this.selectedCountryCode + this.formModel.phone,
      };

      this.isValid();
      if (this.isValidPhone === 'is-valid' && this.isValid()) {
        this.$emit('onSubmit', data);
        const endTime = moment().add(30, "seconds").toDate()
        this.runAuthSmsTimer(endTime);
      } else {
        this.$notify({
          type: 'warning',
          message: 'Необходимо заполнить телефон',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.restore {
  padding: 46px 38px 66px 38px;
  min-width: 384px;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 34px;
  }

  &__item {
    position: relative;
  }

  &__link {
    margin-left: 5px;
    margin-top: 18px;

    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    text-decoration: none;
    color: #000000;
  }

  &__select::-ms-expand {
    display: none;
  }

  &__select {
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: inherit;
    border: none;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    padding-left: 22px;
  }

  &__select-wrapper {
    position: absolute;
    top: 25%;
    left: 13px;
    width: 79px;
    height: 27px;
    background-color: #e5e5e5;
    border-radius: 5px;

    &::after {
      content: '▼';
      position: absolute;
      top: 15px;
      right: 13px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      color: #000;
      font-size: 7px;
      pointer-events: auto;
    }
  }

  &__title {
    margin: 0;
    margin-top: 43px;
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
    color: #000000;
  }

  &__description {
    margin: 0;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    color: #000000;
  }

  &__input-phone {
    padding-left: 105px;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 45px;
    border-radius: 5px;
    color: #000;

    &-sent {
      margin-top: 12px;
      text-decoration: none;
      background: #f7db69;
    }
  }
}
</style>
