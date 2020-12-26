import axios from 'axios';

export default {
    namespaced: true,
    state: {
        statusOptions: {
            0: 'Ожидает',
            1: 'Выполнено'
        },
    },
    getters: {
        getStatusOptions(state) {
            return state.statusOptions;
        },
    },
    mutations: {},
    actions: {
        fetch({ commit }, filter) {
            return axios.post('chessboard', filter).then(response => {
                return response;
            });
        },
        lestNails({ commit }, query) {
            return axios.post('list-client', {query: query}).then(response => {
                return response;
            });
        },

    }
};
