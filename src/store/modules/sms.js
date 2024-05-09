import moment from 'moment';

export default {
  namespaced: true,

  state: {
    smsAuthTimeout: 0,
    smsAuthTimeoutTimer: null,
  },

  getters: {
    smsAuthTimeoutSeconds(state) {
      return state.smsAuthTimeout;
    },
  },

  mutations: {
    SET_SMS_AUTH_TIMEOUT(state, timeout) {
      state.smsAuthTimeout = timeout;
    },
    SET_SMS_AUTH_TIMEOUT_TIMER(state, timer) {
      state.smsAuthTimeoutTimer = timer;
    },
  },

  actions: {
    async runAuthSmsTimer({ commit, state }, end) {
      // Счетчик уже запущен
      if (state.smsAuthTimeoutTimer) {
        return;
      }

      if (!end) {
        return;
      }

      const endTime = moment(end).toDate();

      localStorage.setItem('8e2398usdcij', end);

      const timer = setInterval(function () {
        console.log('sms timer');
        const currentTime = new Date();
        if (currentTime >= endTime) {
          commit('SET_SMS_AUTH_TIMEOUT', 0);
          clearInterval(timer);
          localStorage.removeItem('8e2398usdcij');
          commit('SET_SMS_AUTH_TIMEOUT_TIMER', null);
        } else {
          commit(
            'SET_SMS_AUTH_TIMEOUT',
            parseInt(
              moment.duration(moment(endTime).diff(currentTime)).asSeconds()
            )
          );
        }
      }, 1000);

      commit('SET_SMS_AUTH_TIMEOUT_TIMER', timer);
    },
    async initAuthSmsTimer({ commit, state }) {
      // Счетчик уже запущен
      if (state.smsAuthTimeoutTimer) {
        return;
      }

      const end = localStorage.getItem('8e2398usdcij');

      if (!end) {
        return;
      }
      const endTime = moment(end).toDate();

      const seconds = parseInt(
        moment.duration(moment(endTime).diff(new Date())).asSeconds()
      );

      commit('SET_SMS_AUTH_TIMEOUT', seconds);

      const timer = setInterval(function () {
        console.log('sms timer initial');
        const currentTime = new Date();
        if (currentTime >= endTime) {
          commit('SET_SMS_AUTH_TIMEOUT', 0);
          clearInterval(timer);
          localStorage.removeItem('8e2398usdcij');
          commit('SET_SMS_AUTH_TIMEOUT_TIMER', null);
        } else {
          commit(
            'SET_SMS_AUTH_TIMEOUT',
            parseInt(
              moment.duration(moment(endTime).diff(currentTime)).asSeconds()
            )
          );
        }
      }, 1000);

      commit('SET_SMS_AUTH_TIMEOUT_TIMER', timer);
    },
  },
};
