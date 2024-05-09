<template>
  <FormNewPassword @onSubmit="onSubmitHandler" />
</template>
<script>
import { mapActions } from 'vuex';
import FormNewPassword from '@/views/Forms/Auth/FormNewPassword.vue';

export default {
  components: {
    FormNewPassword,
  },
  computed: {},
  methods: {
    ...mapActions({
      resetPassword: 'auth/forgotPasswordReset',
    }),
    async onSubmitHandler(payload) {
      const formattedPhone = payload.phone.replace(/\D/g, '');
      const { code, password, passwordConfirmation } = payload;
      const res = await this.resetPassword({
        phone: formattedPhone,
        code,
        password,
        passwordConfirmation,
      });

      if (res.status === 200) {
        this.$router.push({
          name: 'SuccessVerifySms',
          params: { verify: 'forgot' },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 2;
}

.content {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: url('../../../public/img/bg.png');
  z-index: 1;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 76px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(233, 229, 229, 0.8);
  backdrop-filter: blur(5px);
  z-index: 10;
}

.popup {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 492px;
  height: 245px;
  background-color: #fff;
  border-radius: 15px;

  @media screen and (min-width: 360px) and (max-width: 768px) {
    width: 340px;
    height: 210px;
  }

  .text {
    font-family: 'SF UI Display';
    font-style: normal;
    font-weight: 400;
    font-size: 28.1685px;
    line-height: 34px;
    text-align: center;
    color: #000;
  }
}

.whatsapp {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    max-width: 250px;
    font-family: 'SF UI Display';
    font-style: normal;
    font-weight: 400;
    font-size: 16.3026px;
    line-height: 19px;
    text-align: center;
    color: #000000;
    opacity: 0.78;
    margin: 18px;
  }

  .btn {
    width: max-content;
    padding: 10px 12px;
    background: #61c66d;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 33px;

    & span {
      font-family: 'SF UI Display';
      font-style: normal;
      font-weight: 400;
      font-size: 12.5956px;
      line-height: 15px;
      text-align: center;
      text-decoration-line: underline;
      text-transform: uppercase;
      color: #ffffff;
    }

    & img {
      width: 17px;
    }
  }
}
</style>
