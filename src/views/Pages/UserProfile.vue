<template>
  <div class="user-profile h-100 w-100" v-if="userInformation">
    <h1 class="user-profile__title text-dark">Мой профиль</h1>
    <div class="user-profile__content d-flex flex-wrap">
      <UserInfo :userInfo="userInformation" />
      <UserAddress />
      <UserPromo />
      <UserPhone
        @switchPasswordModal="switchPasswordModal"
        @switchPhoneModal="switchPhoneModal"
      />
    </div>
    <div v-if="modalPassword || modalPhone" class="fog" @click="closeModals">
      <div class="popup" v-if="modalPassword">
        <FormForgotPassword
          v-if="passwordStep === 1"
          @onSubmit="onSubmitHandler"
          :modal="true"
          @closeModals="onCloseModals"
        />
        <FormVerifySms
          v-if="passwordStep === 2"
          @onSubmit="onSubmitVerify"
          :phoneFor="phone"
          :verify="verify"
          :modal="true"
          @closeModals="onCloseModals"
        />
        <FormNewPassword
          v-if="passwordStep === 3"
          @onSubmit="onSubmitReset"
          :phoneFor="phone"
          :codeFor="code"
          :modal="true"
        />
        <FormSuccessVerifySms
          v-if="passwordStep === 4"
          @onSubmit="passwordChanged"
          :modal="true"
          @closeModals="onCloseModals"
        />
      </div>
      <div class="popup" v-if="modalPhone">
        <FormForgotPassword
          v-if="phoneStep === 1"
          @onSubmit="onSubmitInitialChangePhone"
          :modal="true"
          :changePhone="true"
          @closeModals="switchPhoneModal"
        />
        <FormVerifySms
          v-if="phoneStep === 2"
          @onSubmit="onSubmitVerifyPhone"
          :phoneFor="changePhone"
          :verify="verify"
          :modal="true"
        />
        <FormForgotPassword
          v-if="phoneStep === 3"
          @onSubmit="onSubmitChangePhone"
          :modal="true"
          :changePhone="true"
          :newPhone="true"
        />
        <FormSuccessVerifySms
          v-if="phoneStep === 4"
          @onSubmit="passwordChanged"
          :modal="true"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import UserInfo from '@/views/Dashboard/Cards/UserInfo.vue';
import UserAddress from '@/views/Dashboard/Cards/UserAddress.vue';
import UserPromo from '@/views/Dashboard/Cards/UserPromo.vue';
import UserPhone from '@/views/Dashboard/Cards/UserPhone.vue';
import FormForgotPassword from '@/views/Forms/Auth/FormForgotPassword.vue';
import FormVerifySms from '@/views/Forms/Auth/FormVerifySms.vue';
import FormSuccessVerifySms from '@/views/Forms/Auth/FormSuccessVerifySms.vue';
import FormNewPassword from '@/views/Forms/Auth/FormNewPassword.vue';
import store from '@/store';

export default {
  layout: 'DashboardLayout',
  components: {
    UserInfo,
    UserAddress,
    UserPromo,
    UserPhone,
    FormForgotPassword,
    FormVerifySms,
    FormSuccessVerifySms,
    FormNewPassword,
  },
  data() {
    return {
      orders: [],
      page: 0,
      modalPassword: false,
      modalPhone: false,
      passwordStep: 1,
      phone: null,
      changePhone: null,
      verify: 'forgot',
      code: '',
      phoneStep: 1,
      codePhone: '',
    };
  },

  computed: {
    userInformation() {
      return store.getters['auth/user'];
    },
  },

  mounted() {
    this.getProfile();
  },

  methods: {
    ...mapActions({
      forgotInitial: 'auth/forgotPasswordInitial',
      verifySms: 'auth/verifySmsCode',
      resetPassword: 'auth/forgotPasswordReset',
      changePhoneInitial: 'auth/forgotPhoneInitial',
      verifySmsPhone: 'auth/verifySmsCodePhoneChange',
      changeUserPhone: 'auth/changePhone',
    }),
    passwordChanged() {
      this.passwordStep = 1;
      this.phoneStep = 1;
      this.modalPassword = false;
      this.modalPhone = false;
      this.getProfile();
    },

    /* modalPassword */
    async onSubmitHandler({ phone }) {
      const formattedPhone = phone.replace(/\D/g, '');
      try {
        const res = await this.forgotInitial({
          phone: formattedPhone,
        });

        if (res) {
          this.phone = phone;
          this.passwordStep = 2;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onSubmitVerify(payload) {
      const formattedPhone = payload.phone.replace(/\D/g, '');
      const { code, verifyFor } = payload;

      try {
        const res = await this.verifySms({
          phone: formattedPhone,
          code,
          verifyFor,
        });

        if (res.status === 200 && verifyFor === 'forgot') {
          this.passwordStep = 3;
          this.phone = payload.phone;
          this.code = code;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onSubmitReset(payload) {
      const formattedPhone = payload.phone.replace(/\D/g, '');
      const { code, password, passwordConfirmation } = payload;
      const res = await this.resetPassword({
        phone: formattedPhone,
        code,
        password,
        passwordConfirmation,
      });

      if (res.status === 200) {
        this.passwordStep = 4;
      }
    },

    /* ModalPhone */

    async onSubmitInitialChangePhone({ phone }) {
      const formattedPhone = phone.replace(/\D/g, '');
      try {
        const res = await this.changePhoneInitial({
          phone: formattedPhone,
        });

        if (res) {
          this.changePhone = phone;
          this.phoneStep = 2;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onSubmitVerifyPhone(payload) {
      const { code } = payload;

      try {
        const res = await this.verifySmsPhone({
          code,
        });

        if (res.status === 200) {
          this.phoneStep = 3;
          this.changePhone = payload.phone;
          this.codePhone = code;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async onSubmitChangePhone({ phone }) {
      const formattedPhone = phone.replace(/\D/g, '');
      try {
        const res = await this.changeUserPhone({
          phone: formattedPhone,
          code: this.codePhone,
        });

        if (res.status === 200) {
          this.changePhone = phone;
          this.phoneStep = 4;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getProfile() {
      await this.$http.get(`/client/info`).then((response) => {
        let resUser = response.data;
        store.commit('auth/SET_USER', resUser);
      });
    },
    switchPasswordModal() {
      this.modalPassword = !this.modalPassword;
    },
    switchPhoneModal() {
      this.modalPhone = !this.modalPhone;
    },
    onCloseModals(event) {
      this.modalPassword = false;
      this.modalPhone = false;
    },
    closeModals(event) {
      if (event.target.classList.contains('fog')) {
        this.modalPassword = false;
        this.modalPhone = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fog {
  width: 100%;
  height: calc(100vh - 50px);
  background: rgba(89, 89, 89, 0.65);
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 1283px) {
    height: 100%;
  }
}

.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 384px;
  max-height: 706px;
  background-color: #fff;
  border-radius: 15px;
  opacity: 1;

  @media screen and (min-width: 360px) and (max-width: 768px) {
    width: 340px;
    /* height: 210px; */
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
.user-profile {
  padding: 2.875rem 2.5rem;
  position: relative;
  &__title {
    margin-bottom: 1.5625rem;
  }

  &__content {
    gap: 25px;
  }
}
@media (max-width: 549px) {
  .user-profile {
    padding: 1.625rem 1.25rem;
  }
}
</style>
