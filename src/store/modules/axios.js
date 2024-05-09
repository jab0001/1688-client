import axios from 'axios';
import Vue from 'vue';
import stateful from '../../plugins/stateful';

const instance = axios.create({
  baseURL: process.env.APP_API_BASE_URL,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
    },
  },
});

instance.interceptors.request.use((config) => {
  config.params = config.params || {};
  const token = localStorage.getItem('token');
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$notify({
          type: 'danger',
          message: `${error.response.data.errors[0]}`,
        });
        break;
      case 401:
        Vue.prototype.$store.dispatch('auth/logout');
        break;
      case 403:
        Vue.prototype.$_router.push({ path: '/profile' });
        Vue.prototype.$notify({
          type: 'danger',
          message: 'Доступ запрещен!',
        });
        break;
      case 500:
        Vue.prototype.$notify({
          type: 'danger',
          message: 'Упс, что то пошло не так, попробуйте позже!',
        });
        break;
    }
    return Promise.reject(error);
  }
);

Vue.use(stateful.VueAxios, instance);
