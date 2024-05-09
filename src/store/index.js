import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
// import alerts from "./modules/alerts-module";
import users from './modules/users-module';
import roles from './modules/roles-module';
import categories from './modules/categories-module';
import tags from './modules/tags-module';
import items from './modules/items-module';
import reset from './modules/reset';
import parsing from './modules/parsing';
import profileTemplate from './modules/profile-template';
import editableOrder from './modules/edit';
import layout from './modules/layout';
import ribbon from './modules/ribbon';
import sms from './modules/sms';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    // alerts,
    users,
    roles,
    categories,
    tags,
    items,
    reset,
    parsing,
    profileTemplate,
    editableOrder,
    layout,
    ribbon,
    sms
  },
});
