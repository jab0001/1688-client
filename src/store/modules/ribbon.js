import Vue from 'vue';
import { state } from './users-module';

export default {
  namespaced: true,
  state: {
    ordersList: [],
    feedsList: [],
    notice: {},
  },
  getters: {
    getFeedsList: (state) => {
      return state.feedsList;
    },
    getNotice: (state) => {
      return state.notice;
    },
    getOrdersList: (state) => {
      return state.ordersList;
    },
  },
  actions: {
    async fetchOrdersList({ commit }) {
      try {
        const response = await Vue.axios.get('/orders');
        const {
          data: {
            data: {
              orders: { data: ordersList },
            },
          },
        } = response;
        commit('SET_ORDERS_LIST', ordersList);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch orders list:', error);
      }
    },
    async fetchFeedsList({ commit }) {
      try {
        const response = await Vue.axios.get('/feeds');
        commit('SET_FEEDS_LIST', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch feeds list:', error);
      }
    },
    async fetchNotice({ commit }) {
      try {
        const response = await Vue.axios.get('/notice');
        commit('SET_NOTICE', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch notice:', error);
      }
    },
  },
  mutations: {
    SET_FEEDS_LIST(state, feeds) {
      state.feedsList = feeds;
    },
    SET_NOTICE(state, notice) {
      state.notice = notice;
    },
    SET_ORDERS_LIST(state, orders) {
      state.ordersList = orders;
    },
  },
};
