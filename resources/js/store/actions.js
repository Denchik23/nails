import messages from '../messages/alert';
import router from '../router';

export default {
    handle({commit, dispatch}, axiosThrown) {
        if (!axiosThrown || typeof axiosThrown !== 'object') {
            return Promise.reject('[request handler]: Invalid response format.')
        }

        const status = axiosThrown.response.status;
        const data = axiosThrown.response.data;
        const method = axiosThrown.response.config.method;
        const route = router.currentRoute;
        const message = messages.codes[status] || messages.default;

        if (status === 401) {
            if (route.name === 'Login') {
                dispatch('alert/danger', messages.login);
                return messages.login;
            }

            dispatch('auth/logout', false);
            router.push({ name: 'Login' });
            return messages.codes[401];
        }

        if (status === 404 && method === 'get' && route.params.id) {
            router.push({name: '404'});
            return messages.notFound;
        }

        if (status === 422 && data && data.errors) {
            // TODO убрать или изменить
            /*
            const responseMessage = Object.keys(data.errors).map(attr => {
                return data.errors[attr][0];
            }).join('<br>');
            */
            const responseMessage = data.message
            dispatch('alert/warning', responseMessage);
            return responseMessage;
        }

        dispatch('alert/danger', message);
        return message;
    }
}
