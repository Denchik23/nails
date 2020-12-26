<template>
    <div class="app">
        <app-header />
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <breadcrumb v-if="this.$route.name !== 'Dashboard'"/>
                </div>
            </div>
            <router-view />
        </div>
        <transition name="fade-zoom">
            <div
                v-if="alert.message"
                :class="['alert', 'alert-' + alert.type, 'mb-0', 'fixed-top']"
                role="alert"
            >
                {{ alert.message }}
            </div>
        </transition>
    </div>
</template>

<script>
    import store from '../../store';
    import router from '../../router';
    import AppHeader from "../Header";
    import Breadcrumb from "../utils/Breadcrumb";

    export default {
        name: "Base",
        components: {
            AppHeader,
            Breadcrumb
        },
        computed: {
            alert() {
                return store.state.alert
            }
        },
        beforeRouteEnter(to, from, next) {
            if (!store.getters['auth/authorized']) {
                return router.push({name: 'Login'});
            }

            store.dispatch('auth/user').then(() => {
                next();
            }).catch(e => {
                store.dispatch('handle', e);
            });
        }
    }
</script>
