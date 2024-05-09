<template>
  <form class="new-pass">
    <router-link class="new-pass__link" to="/auth/forgot">
      <img src="@/assets/img/icons/arrow-back.svg" />
    </router-link>

    <div>
      <h2 class="new-pass__title">Новый пароль</h2>
      <p class="new-pass__description">
        Введите новый пароль для вашего аккаунта
      </p>
    </div>

    <ul class="new-pass__list">
      <li class="new-pass__item">
        <input
          type="password"
          v-model="formModel.password"
          class="new-pass__input-password registartion__input profile-order__input form-control rounded-sm text-dark"
          placeholder="Придумайте пароль"
          @click="resetValidation"
          @blur="checkEmpty"
          required
        />
      </li>
      <li class="new-pass__item">
        <input
          type="password"
          v-model="formModel.checkPassword"
          class="new-pass__input-password registartion__input profile-order__input form-control rounded-sm text-dark"
          placeholder="Повторите пароль еще раз"
          required
          :class="checkPassword"
          @blur="checkEmpty"
        />
      </li>
    </ul>

    <button
      @click.prevent="onSubmitHandler"
      class="new-pass__btn new-pass__btn-newPass"
    >
      Поменять пароль
    </button>
  </form>
</template>
<script>
export default {
  props: {
    phoneFor: {
      type: String,
      default: '',
    },
    codeFor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formModel: {
        password: '',
        checkPassword: '',
      },
    };
  },
  computed: {
    phone() {
      return this.phoneFor ? this.phoneFor : this.$route.params.phone;
    },
    code() {
      return this.codeFor ? this.codeFor : this.$route.params.code;
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
        phone: this.phone,
        code: this.code,
        password: this.formModel.password,
        passwordConfirmation: this.formModel.checkPassword,
      };

      this.isValid();

      if (this.isValid()) {
        this.$emit('onSubmit', data);
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
.new-pass {
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

    &-newPass {
      margin-top: 12px;
      text-decoration: none;
      background: #f7db69;
    }
  }
}
</style>
