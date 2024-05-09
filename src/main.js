import Vue from 'vue';
import './store/modules/axios';
import '@/assets/styles/main.scss';

//plugins
import DashboardPlugin from './plugins/dashboard-plugin';
import VueMeta from 'vue-meta';
import IsDemo from './plugins/isDemo';
import VueMask from 'v-mask';
import VTooltip from 'v-tooltip';

// plugin setup
Vue.use(VueMask);
Vue.use(DashboardPlugin);

Vue.use(IsDemo);
Vue.use(VueMeta, { keyName: 'head' });
Vue.use(VTooltip);

// router&store setup
import router from './router';
import store from './store';
import App from './App.vue';

const app = new Vue({
  router: router,
  store: store,
  el: '#app',
  render: (h) => h(App),
});

Vue.prototype.$store = store;
store.$app = app;
