import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    telegram_id: process.env.TG_BOT_ID,
    user: null,
    token: localStorage.getItem('token') || false,
  },

  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return Boolean(state.user);
    },
    user(state) {
      return state.user;
    },
    userTelegramId(state) {
      return state.user?.telegram_id;
    },
    userAuthKey(state) {
      return state.user?.authkey;
    },
    userName(state) {
      return state.user?.username;
    },
    userAddress(state) {
      return state.user?.address;
    },
    userPhone(state) {
      return state.user?.phone;
    },
    userEmail(state) {
      return state.user?.email;
    },
    userImage(state) {
      return state.user?.image;
    },
    userLongPromo(state) {
      return state.user?.long_promo;
    },
    userLongPromoPercent(state) {
      if (state.user?.long_promo) {
        if (
          state.user?.promo_used_count &&
          state.user?.promo_used_count > state.user?.long_promo.initial_amount
        ) {
          return state.user?.long_promo.subsequent_commission;
        } else {
          return state.user?.long_promo.initial_few_commission;
        }
      }
      return null;
    },
    userLongPromoMinPrice(state) {
      if (state.user?.long_promo) {
        if (
          state.user?.promo_used_count &&
          state.user?.promo_used_count > state.user?.long_promo.initial_amount
        ) {
          return state.user?.long_promo.subsequent_min_price;
        } else {
          return state.user?.long_promo.initial_few_min_price;
        }
      }
    },
    userLongPromoRank(state) {
      return state.user?.long_promo?.rank;
    },
    userOrdersCount(state) {
      return state.user?.orders_count;
    },
  },

  mutations: {
    SET_IS_AUTHENTICATED(state, auth) {
      state.isAuthenticated = auth;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_LONG_PROMO(state, longPromo) {
      if (!state.user) return;
      state.user.long_promo = longPromo;
    },
    SET_USER_ADDRESS(state, address) {
      if (!state.user) return;
      state.user.address = address;
    },
  },

  actions: {
    async login({ commit }, { phone, password }) {
      const { data } = await Vue.axios.post('/auth/signin', {
        phone,
        password,
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        commit('SET_IS_AUTHENTICATED', true);
        console.log('SUCCESS! Redirect to Dashboard');
      }

      return data;
    },

    async register(
      { commit },
      { name, email, phone, password, passwordConfirmation }
    ) {
      const { data } = await Vue.axios.post('/auth/signup', {
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      });

      return data;
    },

    async verifySmsCode({ commit }, { phone, code, verifyFor }) {
      const res = await Vue.axios.post(`/auth/${verifyFor}/sms/verify`, {
        phone,
        sms_code: code,
      });

      if (!res.data.token) {
        console.log('SUCCESS! Redirect to login');
      } else {
        localStorage.setItem('token', res.data.token);
        commit('SET_IS_AUTHENTICATED', true);
        console.log('SUCCESS! Redirect to Dashboard');
      }

      return res;
    },

    async verifySmsCodePhoneChange({ commit }, { code }) {
      const res = await Vue.axios.post(`/client/phone-change/sms-verify`, {
        sms_code: code,
      });

      return res;
    },

    async changePhone({ commit }, { code, phone }) {
      const res = await Vue.axios.post('/client/phone-change', {
        phone,
        sms_code: code,
      });

      return res;
    },

    async forgotPasswordInitial({ commit }, { phone }) {
      const res = await Vue.axios.post('/auth/forgot', { phone });

      if (res.status == 200) {
        console.log('SUCCESS! Redirect to sms confirmation');
      } else {
        console.log('FAIL! Display error');
        throw Error();
      }

      return res.data;
    },

    async forgotPhoneInitial({ commit }, { phone }) {
      const res = await Vue.axios.post('/client/phone-change/initial', {
        phone,
      });

      if (res.status == 200) {
        console.log('SUCCESS! Redirect to sms confirmation');
      } else {
        console.log('FAIL! Display error');
        throw Error();
      }

      return res.data;
    },

    async forgotPasswordReset(
      { commit },
      { phone, code, password, passwordConfirmation }
    ) {
      const res = await Vue.axios.post('/auth/forgot/reset', {
        phone,
        password,
        sms_code: code,
        password_confirmation: passwordConfirmation,
      });

      return res;
    },

    logout(context, payload) {
      localStorage.clear();
      router.push({ name: 'Login' });
    },
  },
};
