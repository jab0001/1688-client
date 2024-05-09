<template>
  <form class="login">
    <div class="login__logo">
      <img src="@/assets/img/icons/logo.svg" />
    </div>

    <div>
      <h2 class="login__title">Вход в систему FLG</h2>
      <p class="login__description">
        мы отправили на ваш номер код,<br />введите код из смс в окне ниже:
      </p>
    </div>

    <ul class="login__list">
      <li class="login__item">
        <div class="login__select-wrapper">
          <select class="login__select" v-model="selectedCountryCode">
            <option value="+7">+7</option>
            <option value="+1">+1</option>
            <option value="+33">+33</option>
          </select>
        </div>

        <input
          type="text"
          ref="phone"
          v-mask="`(###) ###-##-##`"
          v-model="formModel.phone"
          :class="isValidPhone"
          placeholder="999 9999"
          class="login__input-phone profile-order__input form-control rounded-sm text-dark"
          required
          @click="resetValidation"
          @blur="checkEmpty"
        />
      </li>
      <li class="login__item">
        <input
          ref="password"
          :type="showPass ? 'text' : 'password'"
          v-model="formModel.password"
          class="login__input-password profile-order__input form-control rounded-sm text-dark"
          placeholder="Ваш пароль"
          required
          @click="resetValidation"
          @blur="checkEmpty"
        />
        <button
          class="login__input-password--visibility"
          type="button"
          @click="passwordVisibility"
        >
          <img src="@/assets/img/icons/eye-show.svg" />
        </button>
      </li>
    </ul>

    <button
      @click.prevent="onSubmitHandler"
      class="login__btn login__btn-submit"
    >
      Войти
    </button>
    <router-link to="/auth/register" class="login__btn login__btn-register">
      Регистрация
    </router-link>
    <router-link class="login__link" to="/auth/forgot"
      >Не помню пароль</router-link
    >
  </form>
</template>
<script>
export default {
  data() {
    return {
      formModel: {
        phone: '',
        password: '',
      },
      showPass: false,
      selectedCountryCode: '+7',
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
  },
  methods: {
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
    passwordVisibility() {
      this.showPass = !this.showPass;
    },

    onSubmitHandler() {
      /* const data = {
        phone: '79999999',
        password: 'NcSmS0j7mB',
      }; */
      const data = {
        phone: this.selectedCountryCode + this.formModel.phone,
        password: this.formModel.password,
      };

      this.isValid();

      if (this.isValidPhone === 'is-valid' && this.isValid()) {
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
.login {
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

    &:first-child {
      margin-bottom: 12px;
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
    width: fit-content;
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

  &__logo {
    width: 87px;
    height: 31px;
    border-radius: 36px;
    background: #fed255;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      position: absolute;
      top: 5px;
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

  &__input-password {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;

    &--visibility {
      position: absolute;
      border: none;
      background: inherit;
      top: 15px;
      right: 19px;
      width: 19px;
      height: 15px;
      padding: 0;
      display: flex;
    }
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 45px;
    border-radius: 5px;
    color: #000;

    &-submit {
      margin-top: 32px;
      background: #f7db69;
    }

    &-register {
      margin-top: 12px;
      text-decoration: none;
      background: #e5e5e5;
    }
  }
}
</style>
