//index.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './moudle/user';
import permission from './moudle/permission';

import getters from './getters';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        permission
    },
    getters
});