<template>
  <form class="verify">
    <router-link v-if="!modal" class="verify__link" to="/auth/login">
      <img src="@/assets/img/icons/arrow-back.svg" />
    </router-link>
    <a href="#" v-if="modal" @click="$emit('closeModals')" class="restore__link">
      <img src="@/assets/img/icons/arrow-back.svg" />
    </a>

    <div>
      <h2 class="verify__title">Подтверждение</h2>
      <p class="verify__description">
        Введите код из смс. Мы отправили его на номер {{ maskedPhone }} Введите код
      </p>
    </div>

    <ul class="verify__list">
      <li class="verify__item">
        <input type="text" v-mask="`###  ###`" :placeholder="`_ _ _  _ _ _`" v-model="code"
          class="verify__input-code registartion__input profile-order__input form-control rounded-sm text-dark"
          required />
      </li>
    </ul>

    <button @click.prevent="onSubmitHandler" class="verify__btn verify__btn-sms">
      Войти
    </button>
    <button :disabled="!allowedToSendCode" @click.prevent="onResendCodeHandler" class="verify__btn verify__btn-check-sms">
      {{ smsAuthTimeout ? `Повтор через ${smsAuthTimeout} сек.` : 'Отправить код еще раз' }}
    </button>
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
    phoneFor: {
      type: String,
      default: ''
    },
    verify: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      code: '',
    };
  },
  computed: {
    ...mapGetters({
      smsAuthTimeout: 'sms/smsAuthTimeoutSeconds',
    }),
    phone() {
      return this.phoneFor ? this.phoneFor : this.$route.params.phone;
    },
    verifyFor() {
      return this.verify ? this.verify : this.$route.params.verify;
    },
    maskedPhone() {
      if (this.phone) {
        return `${this.phone.slice(0, 8)} ###-##-${this.phone.slice(15, 17)}`;
      }
    },
    allowedToSendCode() {
      return !this.smsAuthTimeout
    }
  },
  methods: {
    ...mapActions({
      forgotInitial: 'auth/forgotPasswordInitial',
      runAuthSmsTimer: 'sms/runAuthSmsTimer'
    }),
    onSubmitHandler() {
      const data = {
        phone: this.phone,
        verifyFor: this.verifyFor,
        code: this.code.replace(/\s/g, ''),
      };
      if (this.code.length) {
        this.$emit('onSubmit', data);
        const endTime = moment().add(30, "seconds").toDate()
        this.runAuthSmsTimer(endTime);
      } else {
        this.$notify({
          type: 'warning',
          message: 'Необходимо заполнить указать код',
        });
      }
    },
    async onResendCodeHandler() {
      try {
        const endTime = moment().add(30, "seconds").toDate()
        this.runAuthSmsTimer(endTime);
        const res = await this.forgotInitial({
          phone: this.phone.replace(/\D/g, ''),
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.verify {
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

  &__input-code {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 45px;
    border-radius: 5px;
    color: #000;

    &-check-sms {
      margin-top: 12px;
    }

    &-sms {
      margin-top: 12px;
      text-decoration: none;
      background: #f7db69;
    }
  }
}
</style>
