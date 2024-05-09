<template>
  <div class="telegram-auth">
    <Btn :btnData="btn_data" @actionBtn="tgLogin" />
  </div>
</template>

<script>
import Btn from '@/components/ButtonUniver.vue';

export default {
  name: 'TelegramAuth',
  components: { Btn },
  data() {
    return {
      TG_BOT_ID: process.env.TG_BOT_ID,
    };
  },
  methods: {
    async tgLogin(e) {
      if (e.target.disabled) return;
      e.target.disabled = true;
      try {
        const bot_id = this.TG_BOT_ID;

        window.Telegram.Login.auth(
          { bot_id, request_access: true },
          async (data) => {
            let user = {
              name: data.first_name,
              tag: data.username,
              telegram_id: data.id,
            };

            if (process.env.APP_ENV === 'local') {
              user = JSON.parse(localStorage.getItem('local_auth'));
            }
            await this.$store.dispatch('auth/login', { user });
            this.$notify({
              type: 'success',
              message: 'Успешная авторизация',
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    mounted() {
      window.tgOnAuthCallback = this.tg_auth;
    },
  },
  computed: {
    btn_data() {
      return {
        name: 'Войти через телеграм',
        btnStyleName: ' btnAuth',
        btnTextStyleName: 'btnTextStyle',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.telegram-auth {
  height: 44px;
  width: 410px;
  @media screen and (min-width: 360px) and (max-width: 768px) {
    width: 280px;
    height: 38px;
  }
}

.btnAuth {
  width: 100%;
  height: 100%;
  font-family: 'SF UI Display';
  font-style: normal;
  font-weight: 400;
  font-size: 14.8503px;
  line-height: 18px;
  text-align: center;
  color: #000;
}
</style>
