import axios from 'axios';
import constants from '../../constants';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(constants.tokenName),
        refreshTimeout: 1000 * 60 * 60,
        refresh: null,
        lastRefresh: 0,
        username: null,
        userid: null,
        email: null
    },
    getters: {
        authorized(state) {
            return Boolean(state.token);
        },

        username(state) {
            return state.username;
        },

        email(state) {
            return state.email;
        },

        userid(state) {
            return state.userid;
        },

        auth_user(state) {
            return Object.assign({}, {
                id: state.userid,
                name: state.username,
                email: state.email,
            });
        }
    },
    mutations: {

        SET_TOKEN(state, { type, token }) {
            const newToken = type + ' ' + token;
            state.token = newToken;
            localStorage.setItem(constants.tokenName, newToken);
            window.axios.defaults.headers.Authorization = newToken;
        },

        SET_REFRESH_INTERVAL(state, interval) {
            state.refresh = setInterval(interval, 8000);
        },

        UPDATE_LAST_REFRESH(state) {
            state.lastRefresh = (new Date()).getTime();
        },

        SET_USER_DATA(state, { id, email, name }) {
            state.userid = id;
            state.email = email;
            state.username = name;
        },

        LOGOUT(state) {
            state.token = null;
            state.userid = null;
            state.email = null;
            state.username = null;

            localStorage.removeItem(constants.tokenName);
            axios.defaults.headers.Authorization = null;

            if (state.refresh) {
                clearInterval(state.refresh);
                state.refresh = null;
                state.lastRefresh = 0;
            }
        }
    },
    actions: {

        login({ commit }, loginData) {
            return axios.post('auth/login', loginData)
                .then(response => {
                    commit('SET_TOKEN', {
                        type: response.data.token_type,
                        token: response.data.access_token
                    });
                });
        },

        refresh({ commit }) {
            return axios.post('auth/refresh')
                .then(response => {
                    commit('SET_TOKEN', {
                        type: response.data.token_type,
                        token: response.data.access_token
                    });
                    commit('UPDATE_LAST_REFRESH');
                })
                .catch(e => {
                    return store.dispatch('handle', e);
                });
        },

        user({ state, commit, dispatch }) {
            return axios.get('auth/profile')
                .then(response => {
                    commit('SET_USER_DATA', response.data);

                    if (!state.refresh) {
                        const interval = () => {
                            const current = (new Date()).getTime();
                            const last = state.lastRefresh;
                            const timeout = state.refreshTimeout;

                            if (current - last > timeout) {
                                dispatch('refresh').catch(e => {
                                    return dispatch('handle', e, {root: true});
                                })
                            }
                        };
                        commit('SET_REFRESH_INTERVAL', interval);
                    }
                })
                .then(() => dispatch('refresh'));
        },

        logout({ commit }, sync) {
            if (sync) {
                axios.post('auth/logout').catch(e => e);
            }
            commit('LOGOUT');
        }
    }
}
