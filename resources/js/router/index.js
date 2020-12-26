import Vue from 'vue';
import Router from 'vue-router';

// Компоненты
import Base from '../components/pages/Base';
import Dashboard from '../components/pages/Dashboard';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import Nails from '../components/pages/Nails';
import NailAdd from '../components/pages/NailAdd';
import NailEdit from '../components/pages/NailEdit';
import Clients from '../components/pages/Clients';

Vue.use(Router);

export default new Router({
    base: '/',
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Base',
            redirect: {name: 'Dashboard'},
            component: Base,
            children: [
                { path: '404', from: '*', redirect: {name: '404'} },
                { path: 'dashboard', name: 'Dashboard', component: Dashboard, meta: {title: "Главная"} },
                { path: 'nail-add', name: 'NailAdd', component: NailAdd, meta: {title: "Запись клиента"} },
                { path: 'clients', name: 'Clients', component: Clients, meta: {title: "База клиентов"} },
                { path: 'nail-edit/:uuid', name: 'NailEdit', component: NailEdit, props: true, meta: {title: "Обновление записи"} },
                { path: 'nails', name: 'Nails', component: Nails, meta: {title: "Все записи"} },
            ]
        },
        {
            path: '/404',
            name: '404',
            component: NotFound
        },
        {
            path: '/*',
            redirect: {name: '404'},
        }
    ]
});
