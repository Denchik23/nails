import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

import alert from './modules/alert';
import auth from './modules/auth';
import chessnails from './modules/chessnails';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        ready: false
    },
    actions,
    mutations,
    modules: {
        alert,
        auth,
        chessnails
    },
    strict: process.env.NODE_ENV !== 'production'
});
