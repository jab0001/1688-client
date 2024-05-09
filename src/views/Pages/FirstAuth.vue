<template>
  <div class="f-a">
    <div class="f-a__inner">
      <div class="f-a__block" v-if="count == 0">
        <p class="f-a__title">Подтвердите регистрацию через Телеграм - бота</p>
        <img class="f-a__qr" src="/qr-bot.jpg" alt="" />
        <p class="f-a__text">
          Перейдите по QR коду
          <a class="f-a__link" :href="`tg://resolve?domain=${tg_bot_username}`"
            >(или нажмите сюда)</a
          >
          и активируйте бота коммандой /start Если этого не сделать - менеджер
          не сможет с вами связаться!
        </p>
        <button
          class="f-a__button btn base-button text-dark"
          @click="checkAuth"
        >
          Проверить
        </button>
      </div>
      <div class="f-a__form f-a__block" v-if="count == 1">
        <p class="f-a__title">Введите ваши данные</p>
        <div class="f-a__form-item">
          <input type="text" placeholder="Имя" v-model="form.name" required />
        </div>
        <div class="f-a__form-item">
          <input
            type="text"
            placeholder="Телефон"
            v-model="form.phone"
            v-mask="'+# (###) ###-##-##'"
            required
          />
        </div>
        <div class="f-a__form-item">
          <input
            type="text"
            placeholder="Email"
            v-model="form.email"
            required
          />
        </div>
        <button
          class="save-btn btn base-button text-dark f-a__button"
          @click="registerUser"
        >
          Приступить к заказу
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'FirstAuth',
  data() {
    return {
      tg_bot_username: process.env.TG_BOT_USERNAME,
      count: 0,
      form: {
        name: store.getters['auth/userName'],
        phone: store.getters['auth/userPhone'],
        email: store.getters['auth/userEmail'],
      },
    };
  },

  methods: {
    async checkAuth() {
      await this.$http.post('/login/telegram/checklogin').then((res) => {
        localStorage.setItem('user_active', 'yes');
        this.count = 1;
        this.$notify({
          type: 'success',
          message: ' Активация прошла успешно!',
        });
      });
    },

    async registerUser() {
      await this.$http
        .post('/client/update', {
          email: this.form.email,
          phone: this.form.phone,
          name: this.form.name,
        })
        .then(async (response) => {
          await this.$http.get(`/client/info`).then((response) => {
            let resUser = response.data.data.client;
            store.commit('auth/SET_USER', resUser);
          });
          if (localStorage.getItem('user_active') == 'yes') {
            this.$router.push('/new_order').catch((err) => {});
          }
        });
    },
  },
  mounted() {
    if (localStorage.getItem('user_active') == 'yes') {
      this.count = 1;
    }
  },
};
</script>

<style lang="scss" scoped>
.f-a {
  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
    padding: 0 30px;
  }
  &__title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    @media screen and (max-width: 480px) {
      font-size: 3.75vw;
    }
  }
  &__qr {
    width: 300px;
    height: 300px;
    @media screen and (max-width: 480px) {
      width: 100%;
      height: auto;
    }
  }
  &__button {
    width: max-content;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    cursor: pointer;
  }
  &__block {
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  &__text {
    margin-top: 20px;
    max-width: 50%;
    @media screen and (max-width: 480px) {
      font-size: 3.75vw;
    }
  }
  &__form {
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    @media screen and (max-width: 480px) {
      gap: 10.42vw;
    }
    &-item {
      width: 100%;
      & input {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 10px;
        text-align: center;
        font-weight: 600;
        @media screen and (max-width: 480px) {
          border-bottom: 0.42vw solid #e9ecef;
          padding-bottom: 2.08vw;
          font-size: 2.92vw;
        }
      }
    }
    & .f-a__button {
      margin-top: 20px;
      @media screen and (max-width: 480px) {
        margin-top: 4.17vw;
      }
    }
  }
}
</style>
