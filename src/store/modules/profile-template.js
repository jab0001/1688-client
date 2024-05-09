const state = {
  templates: [],
  usingTemplate: false,
  activeTemplate: {},
  templateIsUsed: false,
};

const mutations = {
  SET_USING_TEMPLATE: (state, payload) => {
    state.usingTemplate = payload;
  },

  SET_ACTIVE_TEMPLATE: (state, payload) => {
    state.activeTemplate = payload;
  },

  SET_TEMPLATE_IS_USED: (state, payload) => {
    state.templateIsUsed = payload;
  },
  SET_TEMPLATES: (state, payload) => {
    state.templates = payload;
  },
  DELETE_TEMPLATE: (state, payload) => {
    state.templates = state.templates.filter(draft=> draft.id!== payload);
  },
  PUSH_TEMPLATE_TO_ACTIVE: (state, payload) => {
    state.activeTemplate = payload.draft;
  },
  SET_TEMPLATE_AS_ACTIVE: (state, payload) => {
    state.activeTemplate = state.templates.filter(draft=> draft.id=== payload)[0];
  },
  CLEAN_ACTIVE_TEMPLATE: (state) => {
    state.activeTemplate = {};
    state.templateIsUsed = false;
  },
};

const getters = {
  usingTemplate: (state) => state.usingTemplate,
  activeTemplate: (state) => state.activeTemplate,
  templateIsUsed: (state) => state.templateIsUsed,
};

const profileTemplate = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default profileTemplate;
