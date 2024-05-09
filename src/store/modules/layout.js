const state = {
  isVisibleMenu: false,
  useHomeAddress: false,
}

const mutations = {
  SET_VISIBLE_MENU: (state, payload) => {
    state.isVisibleMenu = payload;
  },
  SET_USE_HOME_ADDRESS: (state, payload) => {
    state.useHomeAddress = payload;
  }
}

const getters = {
  isVisibleMenu: (state) => state.isVisibleMenu,
  useHomeAddress: (state) => state.useHomeAddress,
}

const layout = {
  namespaced: true,
  state,
  mutations,
  getters,
};

export default layout;