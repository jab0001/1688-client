<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark"
          >Введите ваш номер телефона и электронную почту для ускоренной
          обработки заказа</label
        >
        <div class="new-order__form-container">
          <div class="form-item">
            <span class="label-text">Номер телефона:</span>
            <input
              type="text"
              v-mask="'+# (###) ###-##-##'"
              v-model="phone"
              :class="isValidPhone"
              class="profile-order__input form-control rounded-sm text-dark"
              required
            />
          </div>
          <div class="form-item">
            <span class="label-text">Email:</span>
            <input
              type="text"
              v-model="email"
              :class="[isValidEmail]"
              class="profile-order__input form-control rounded-sm text-dark"
              required
            />
          </div>

          <div class="save-btn new-order__button btn base-button text-dark">
            Сохранить
          </div>
        </div>
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
import store from '@/store';

export default {
  name: 'OrderComponentProfile',
  data() {
    return {
      phone: '',
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  computed: {
    steps() {
      return this.$store.getters['parsing/steps'];
    },

    isValidPhone() {
      return this.phone === ''
        ? ''
        : this.phone.length === 18
        ? 'is-valid'
        : 'is-invalid';
    },

    isValidEmail() {
      return this.email === ''
        ? ''
        : this.reg.test(this.email)
        ? 'is-valid'
        : 'is-invalid';
    },
  },

  methods: {
    nextStep() {
      if (this.isValidPhone === 'is-valid') {
        this.steps.find(
          (item) => item.name === 'OrderComponentProfile'
        ).isReady = true;
        this.$store.commit('parsing/SET_STEPS', this.steps);
        this.$emit('nextStep');
      } else {
        this.$notify({
          type: 'warning',
          message: 'Необходимо заполнить телефон',
        });
      }
    },

    getUserInfoWithLocalStorage() {
      this.phone = store.getters['auth/userPhone'] || '';
      this.email = store.getters['auth/userEmail'] || '';
    },
  },

  watch: {
    phone(val) {
      this.$store.commit('parsing/SET_PHONE', val);
    },

    email(val) {
      this.$store.commit('parsing/SET_EMAIL', val);
    },
  },
  mounted() {
    this.getUserInfoWithLocalStorage();
  },
};
</script>

<style scoped lang="scss">
.new-order__form-container {
  max-width: 510px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    max-width: 100%;
  }
  .save-btn {
    margin-top: 10px;
    max-width: 280px;
    width: 100%;
    max-height: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    align-self: center;
    border-radius: 10px;
    @media screen and (max-width: 480px) {
      max-height: auto;
      margin-top: 2.08vw;
      border-radius: 2.08vw;
    }
  }
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  @media screen and (max-width: 480px) {
    margin-bottom: 1.67vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  & span {
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
      margin-bottom: 1.04vw;
    }
  }
  .profile-order__input {
    max-width: 230px;
    max-height: 42px;
    height: 100%;
    width: 100%;
    @media screen and (max-width: 480px) {
      max-width: 100%;
      max-height: 8.75vw;
      font-size: 2.92vw;
    }
  }
  &:last-child {
    margin-bottom: 0;
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
