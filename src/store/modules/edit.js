const state = {
  usingEditableOrder: false,
  activeEditableOrder: {},
  editableOrderIsUsed: false,
  editableOrderId: null,
  editableOrderPackageMethod: null,
  editableOrderAddress: '',
  editableOrderTitle: '',
  editableOrderAmoId: null,
  editableOrderImageName: '',
  editableOrderImageUrl: '',
  editableOrderComment: '',
};

const mutations = {
  SET_USING_EDITABLE_ORDER: (state, payload) => {
    state.usingEditableOrder = payload;
  },

  SET_ACTIVE_EDITABLE_ORDER: (state, payload) => {
    state.activeEditableOrder = payload;
  },

  SET_EDITABLE_ORDER_IS_USED: (state, payload) => {
    state.editableOrderIsUsed = payload;
  },

  SET_EDITABLE_ORDER_ID: (state, payload) => {
    state.editableOrderId = payload;
  },

  SET_EDITABLE_ORDER_PACKAGE_METHOD: (state, payload) => {
    state.editableOrderPackageMethod = payload;
  },

  SET_EDITABLE_ORDER_ADDRESS: (state, payload) => {
    state.editableOrderAddress = payload;
  },

  SET_EDITABLE_ORDER_TITLE: (state, payload) => {
    state.editableOrderTitle = payload;
  },

  SET_EDITABLE_ORDER_AMO_ID: (state, payload) => {
    state.editableOrderAmoId = payload;
  },
  SET_EDITABLE_ORDER_IMAGE_NAME: (state, payload) => {
    state.editableOrderImageName = payload;
  },

  SET_EDITABLE_ORDER_IMAGE_URL: (state, payload) => {
    state.editableOrderImageUrl = payload;
  },

  SET_EDITABLE_ORDER_COMMENT: (state, payload) => {
    state.editableOrderComment = payload;
  },

  CLEAN_ACTIVE_EDITABLE_ORDER: (state, payload) => {
    state.activeEditableOrder = {};
    state.editableOrderIsUsed = false;
    state.usingEditableOrder = false;
    state.editableOrderId = null;
    state.editableOrderPackageMethod = null;
    state.editableOrderAddress = '';
    state.editableOrderTitle = '';
    state.editableOrderAmoId = null;
    state.editableOrderImageName = '';
    state.editableOrderImageUrl = '';
    state.editableOrderComment = '';
  },
};

const getters = {
  usingEditableOrder: (state) => state.usingEditableOrder,
  activeEditableOrder: (state) => state.activeEditableOrder,
  editableOrderIsUsed: (state) => state.editableOrderIsUsed,
  editableOrderId: (state) => state.editableOrderId,
  editableOrderPackageMethod: (state) => state.editableOrderPackageMethod,
  editableOrderAddress: (state) => state.editableOrderAddress,
  editableOrderTitle: (state) => state.editableOrderTitle,
  editableOrderAmoId: (state) => state.editableOrderAmoId,
  editableOrderImageName: (state) => state.editableOrderImageName,
  editableOrderImageUrl: (state) => state.editableOrderImageUrl,
  editableOrderComment: (state) => state.editableOrderComment,
};

const editableOrder = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default editableOrder;
