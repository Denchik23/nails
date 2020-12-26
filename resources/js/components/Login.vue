<template>
    <div class="container">
        <transition name="fade-zoom">
            <div
                v-if="alert.message"
                :class="['alert', 'alert-' + alert.type, 'mb-0', 'fixed-top']"
                role="alert"
            >
                {{ alert.message }}
            </div>
        </transition>
        <form @submit.prevent="login()" class="form-signin needs-validation" novalidate>
            <div class="text-center">
                <img class="mb-4 img-thumbnail" src="img/hare.jpg" alt="Заяц">
                <h1 class="h3 mb-3 font-weight-normal">Ногтевой сервис</h1>
            </div>
            <div class="form-group">
                <label for="email">Логин</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Введите ваш логин"
                    class="form-control"
                    id="email"
                    v-model="$v.form.email.$model"
                    :class="{ 'is-invalid': $v.form.email.$error }"
                >
                <small class="form-text text-muted">На данный момент логином является <strong>E-mail</strong></small>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    class="form-control"
                    id="password"
                    v-model="$v.form.password.$model"
                    :class="{ 'is-invalid': $v.form.password.$error }"
                >
            </div>
            <button
                type="submit"
                class="btn btn-lg btn-primary btn-block mt-4"
                :disabled="progress"
            >Авторизоваться</button>
        </form>
    </div>
</template>

<script>
    import store from '../store'
    import router from '../router'
    import Vuelidate from 'vuelidate'
    import { validationUtils } from '../utils/validationUtils'
    import Vue from "vue";
    import { required } from "vuelidate/lib/validators";

    Vue.use(Vuelidate)

    const validEmail = (value) => validationUtils.latinEmail(value)

    export default {
        name: "Login",
        data() {
            return {
                progress: false,
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        validations () {
            return {
                form: {
                    email: {
                        required,
                        validEmail
                    },
                    password: {
                        required
                    }
                }
            }
        },
        computed: {
            alert() {
                return store.state.alert
            }
        },
        beforeRouteEnter(to, from, next) {
            return store.getters['auth/authorized']
                ? router.push({name: 'Dashboard'})
                : next()
        },
        methods: {
            login() {
                this.progress = true
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    store.dispatch('auth/login', Object.assign({}, this.form))
                        .then(() => {
                            router.push({name: 'Base'})
                        })
                        .catch(e => {
                            this.progress = false
                            store.dispatch('handle', e)
                        });
                } else {
                    this.progress = false
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
</style>
