export default {
    namespaced: true,
    state : {
        message: null,
        type: null,
        timeout: 10000
    },
    getters: {
        message(state) {
            return state.message;
        },
        type(state) {
            return state.type;
        }
    },
    mutations: {
        SET_MESSAGE(state, message) {
            state.message = message;
        },
        SET_TYPE(state, type) {
            state.type = type;
        },
        SET_TIMEOUT(state, timeout) {
            state.timeout = timeout;
        }
    },
    actions: {
        show({ commit, dispatch, state }, { message, type, autohide, timeout }) {
            commit('SET_MESSAGE', message);
            commit('SET_TYPE', type);
            if (autohide) {
                setTimeout(() => dispatch('hide'), (timeout || state.timeout));
            }
            return Promise.resolve(message);
        },
        hide({ commit }) {
            commit('SET_MESSAGE', null);
            commit('SET_TYPE', null);
            return Promise.resolve(true);
        },
        danger({ dispatch }, message) {
            return dispatch('show', {
                message: message,
                type: 'danger',
                autohide: true
            });
        },
        warning({ dispatch }, message) {
            return dispatch('show', {
                message: message,
                type: 'warning',
                autohide: true
            });
        },
        success({ dispatch }, message) {
            return dispatch('show', {
                message: message,
                type: 'success',
                autohide: true
            });
        },
        info({ dispatch }, message) {
            return dispatch('show', {
                message: message,
                type: 'info',
                autohide: true
            });
        },
        primary({ dispatch }, message) {
            return dispatch('show', {
                message: message,
                type: 'primary',
                autohide: true
            });
        }
    }
}
