<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Всего заявок за месяц
                    <span class="badge badge-primary badge-pill">{{totalPerMonth}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Сумма за месяц &#8381;
                    <span class="badge badge-primary badge-pill">{{sumPerMonth}}</span>
                </li>
            </ul>
            <div class="card">
                <div class="card-header">Клиенты в очереди</div>
                <div class="card-body">
                    <div class="row">
                        <div v-for="item in clientToday" :key="item.id" class="col-md-6 border-bottom mb-3 pb-2">
                            <div class="row">
                                <div class="col-md-6"><h4>{{item.client.name}}</h4></div>
                                <div class="col-md-6"><h5 class="text-muted">Дата: {{item.data}} <span class="badge badge-info">{{item.time}}</span></h5></div>
                            </div>
                            <div class="row my-2">
                                <div class="col-12">
                                    <router-link :to="{ name: 'NailEdit', params: { uuid: item.id } }" class="btn btn-primary btn-sm">
                                        <span title="icon name" aria-hidden="true" class="oi oi-pencil mr-2"></span>Ред.
                                    </router-link>
                                    <a v-bind:href="'tel:+7'+item.client.phone" class="btn btn-success btn-sm"><img src="img/phone-call.svg" class="mr-2">Позвонить</a>
                                    <button type="button" class="btn btn-danger btn-sm" @click="delNail(item.id)"><span title="icon name" aria-hidden="true" class="oi oi-circle-x mr-2"></span>Удал.</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="!clientToday.length" class="col-12">
                            Нет записей
                        </div>
                    </div>
                </div>
            </div>
            <router-link :to="{name: 'NailAdd'}" class="btn btn-primary btn-lg mt-5 btn-block">Записать клиента</router-link>
        </div>
    </div>
</template>

<script>
    import {appApi} from "../../api/appApi"
    import store from "../../store"
    import { ModalPlugin } from 'bootstrap-vue'
    import Vue from "vue"

    Vue.use(ModalPlugin)

    export default {
        name: "Dashboard",
        data () {
            return {
                clientToday: [],
                totalPerMonth: '',
                sumPerMonth: '',
            }
        },
        mounted () {
            this.getNails()
        },
        methods: {
            getNails() {
                const app = this;
                appApi.getNailsToday()
                    .then((response) => {
                        app.clientToday = response.data;
                        this.getPerMonth()
                    })
                    .catch(e => {
                        store.dispatch('handle', e)
                    });
            },
            getPerMonth() {
                const app = this;
                appApi.getNailsPerMonth()
                    .then((response) => {
                        app.totalPerMonth = response.data.total
                        app.sumPerMonth = response.data.sum
                    })
                    .catch(e => {
                        store.dispatch('handle', e)
                    });
            },
            delNail(id) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить запись клиента?', {
                    title: 'Внимание!',
                    size: 'sm',
                    okVariant: 'danger',
                    cancelVariant: 'primary',
                    okTitle: 'Удалить',
                    cancelTitle: 'Отмена',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(value => {
                        if (value) {
                            appApi.delNail(id)
                                .then((response) => {
                                    if (response.data.status) {
                                        store.dispatch('alert/success', response.data.message)
                                        this.getNails();
                                    } else {
                                        store.dispatch('alert/danger', response.data.message)
                                    }
                                })
                                .catch(e => {
                                    store.dispatch('handle', e)
                                });
                        }
                    })
                    .catch(err => {
                        // An error occurred
                    })
            }
        },
        components: {
        },
    }
</script>
