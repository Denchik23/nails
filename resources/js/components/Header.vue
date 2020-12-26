<template>
    <div>
        <b-navbar toggleable="md" type="light " variant="white">
            <div class="container">
                <b-navbar-brand href="#">Manikure</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item :to="{name: 'Dashboard'}">Главная</b-nav-item>
                        <b-nav-item :to="{name: 'Clients'}">База клиентов</b-nav-item>
                        <b-nav-item :to="{name: 'NailAdd'}">Запись клиента</b-nav-item>
                        <b-nav-item :to="{name: 'Nails'}">Все записи</b-nav-item>
                        <b-nav-item href="#" disabled>Производители локов</b-nav-item>
                        <b-nav-item href="#" disabled>Лаки</b-nav-item>
                        <b-nav-item @click="logout">Выход</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters} from 'vuex'
    import { NavbarPlugin } from 'bootstrap-vue'

    Vue.use(NavbarPlugin);

    export default {
        name: "Header",
        computed: {
            ...mapGetters({
                auth_user: 'auth/auth_user'
            })
        },
        methods: {
            logout() {
                store.dispatch('auth/logout').then(() => {
                    router.push({name: "Login"});
                    //alert('Exit!');
                });
            }
        }
    }
</script>
