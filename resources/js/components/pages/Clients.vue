<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h3>Всего книентов <span class="badge badge-primary">{{totalItems}}</span></h3>
                </div>
            </div>
            <div class="row">
                <div v-for="item in clientList" :key="item.id" class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{item.name}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">+7{{item.phone}}</h6>
                            <p class="card-text">{{item.description}}</p>
                            <button type="button" class="btn btn-primary btn-sm" @click="editClient(item.id)"><span title="icon name" aria-hidden="true" class="oi oi-pencil mr-2"></span>Ред.</button>
                            <a v-bind:href="'tel:+7'+item.phone" class="btn btn-success btn-sm"><img src="img/phone-call.svg" class="mr-2">Позвонить</a>
                            <button type="button" class="btn btn-danger btn-sm" @click="delClient(item.id)"><span title="icon name" aria-hidden="true" class="oi oi-circle-x mr-2"></span>Удал.</button>
                        </div>
                    </div>
                    <modal-form-client
                        v-bind:form-id="'modal-edit-client-' + item.id"
                        title="Редактирование клиента"
                        v-bind:data-edit="item"
                        api-client="updateClient"
                        :callback-action="updateClient"
                    />
                </div>
            </div>
            <div class="row" v-if="clientList.length">
                <div class="col-12 mt-4">
                    <b-pagination :total-rows="totalItems" v-model="currentPage" :per-page="perPage" class="justify-content-center"></b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {appApi} from "../../api/appApi"
    import store from "../../store"
    import ModalFormClient from '../actions/ModalFormClient.vue'
    import { ModalPlugin } from 'bootstrap-vue'
    import { PaginationPlugin } from 'bootstrap-vue'

    Vue.use(PaginationPlugin)
    Vue.use(ModalPlugin)

    export default {
        name: "Clients",
        components: {
            ModalFormClient
        },
        data() {
            return {
                clientList: [],
                totalItems: 0,
                currentPage: 1,
                perPage: 9
            }
        },
        created () {
            this.getList()
        },
        watch: {
            currentPage: {
                handler: function(value) {
                    this.getList();
                }
            }
        },
        methods: {
            getList() {
                const app = this;
                appApi.getListClients(app.currentPage)
                    .then((response) => {
                        app.clientList = response.data.data;
                        app.totalItems = response.data.total;
                        app.perPage = response.data.per_page;
                    })
                    .catch(e => {
                        store.dispatch('handle', e)
                    });
            },
            editClient(id) {
                this.$bvModal.show('modal-edit-client-'+id)
            },
            updateClient() {
                this.getList();
            },
            delClient(id) {
                this.$bvModal.msgBoxConfirm('Удаление клиента, так же удалит все его записи.', {
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
                            appApi.delClient(id)
                                .then((response) => {
                                    if (response.data.status) {
                                        store.dispatch('alert/success', response.data.message)
                                        this.getList();
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
        }
    }
</script>

<style scoped>

</style>
