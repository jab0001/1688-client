<template>
  <form class="registration">
    <router-link class="registration__link" to="/auth/login">
      <img src="@/assets/img/icons/arrow-back.svg" />
    </router-link>

    <div>
      <h2 class="registration__title">Регистрация</h2>
      <p class="registration__description">
        Введите данные для регистрации кабинета в компании FLG
      </p>
    </div>

    <ul class="registration__list">
      <li class="registration__item">
        <input
          ref="fio"
          type="text"
          v-model="formModel.fio"
          class="registration__input-fio registartion__input profile-order__input form-control rounded-sm text-dark"
          placeholder="Ваше ФИО"
          @click="resetValidation"
          @blur="checkEmpty"
          required
        />
      </li>
      <li class="registration__item">
        <div class="registration__select-wrapper">
          <select class="registration__select" v-model="selectedCountryCode">
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
          class="registration__input-phone registartion__input profile-order__input form-control rounded-sm text-dark"
          @blur="checkEmpty"
          required
        />
      </li>
      <li class="registration__item">
        <input
          ref="email"
          type="email"
          v-model="formModel.email"
          :class="[isValidEmail]"
          class="registration__input-fio registartion__input profile-order__input form-control rounded-sm text-dark"
          placeholder="E-mail"
          @blur="checkEmpty"
          required
        />
      </li>
      <li class="registration__item">
        <input
          ref="password"
          type="password"
          v-model="formModel.password"
          class="registration__input-password registartion__input profile-order__input form-control rounded-sm text-dark"
          placeholder="Придумайте пароль"
          @click="resetValidation"
          @blur="checkEmpty"
          required
        />
      </li>
      <li class="registration__item">
        <input
          ref="checkPassword"
          type="password"
          v-model="formModel.checkPassword"
          class="registration__input-password registartion__input profile-order__input form-control rounded-sm text-dark"
          placeholder="Повторите пароль еще раз"
          :class="checkPassword"
          @blur="checkEmpty"
          required
        />
        <p
          class="registration__message-error"
          v-if="checkPassword === 'is-invalid'"
        >
          Пароль не совпадает
        </p>
      </li>
    </ul>

    <button
      @click.prevent="onSubmitHandler"
      class="registration__btn registration__btn-register"
    >
      Регистрация
    </button>
    <router-link class="registration__link" to="/auth/login"
      >Уже есть аккаунт</router-link
    >
  </form>
</template>
<script>
export default {
  data() {
    return {
      formModel: {
        fio: '',
        phone: '',
        email: '',
        password: '',
        checkPassword: '',
      },
      selectedCountryCode: '+7',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    isValidPhone() {
      return this.formModel.phone === ''
        ? ''
        : this.formModel.phone.length === 15
        ? 'is-valid'
        : 'is-invalid';
    },
    isValidEmail() {
      return this.formModel.email === ''
        ? ''
        : this.reg.test(this.formModel.email)
        ? 'is-valid'
        : 'is-invalid';
    },
    checkPassword() {
      return this.formModel.checkPassword === ''
        ? ''
        : this.formModel.password.length &&
          this.formModel.password === this.formModel.checkPassword
        ? 'is-valid'
        : 'is-invalid';
    },
  },
  methods: {
    checkEmpty(event) {
      event.target.value === '' ? event.target.classList.add('is-invalid') : '';
    },

    passwordVisibility() {
      this.showPass = !this.showPass;
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
        name: this.formModel.fio,
        email: this.formModel.email,
        phone: this.selectedCountryCode + this.formModel.phone,
        password: this.formModel.password,
        passwordConfirmation: this.formModel.checkPassword,
      };

      this.isValid();
      if (
        this.isValidPhone === 'is-valid' &&
        this.isValid() &&
        this.isValidEmail === 'is-valid'
      ) {
        this.$emit('onSubmit', data);
      } else {
        this.$notify({
          type: 'warning',
          message: 'Необходимо заполнить форму',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
  padding: 46px 38px 66px 38px;
  min-width: 384px;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__message-error {
    margin: 0;
    color: #fb6340;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 34px;
  }

  &__item {
    position: relative;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
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
  }

  &__input-phone,
  &__input-fio,
  &__input-email,
  &__input-password {
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

    &-register {
      margin-top: 12px;
      text-decoration: none;
      background: #f7db69;
    }
  }
}
</style>
