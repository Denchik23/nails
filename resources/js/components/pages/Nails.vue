<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card mb-3">
                <div class="card-body">
                    <h3>Всего записей <span class="badge badge-primary">{{totalItems}}</span></h3>
                </div>
            </div>
            <div class="row">
                <div v-for="item in nailList" :key="item.id" class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{item.client.name}}</h5>
                            <div class="row my-2">
                                <div class="col-6">
                                    <h6 class="text-muted">+7{{item.client.phone}}</h6>
                                </div>
                                <div class="col-6">{{item.price}} &#8381;</div>
                            </div>
                            <div class="row my-2">
                                <div class="col-6">Дата:<br>{{item.termin}}</div>
                                <div class="col-6">Статус:<br>{{item.status}}</div>
                            </div>
                            <p class="card-text">{{item.description}}</p>
                            <router-link :to="{name: 'NailEdit', params: {uuid: item.id}}" class="btn btn-primary btn-sm"><span title="icon name" aria-hidden="true" class="oi oi-pencil mr-2"></span>Ред.</router-link>
                            <a v-bind:href="'tel:+7'+item.client.phone" class="btn btn-success btn-sm"><img src="img/phone-call.svg" class="mr-2">Позвонить</a>
                            <button type="button" class="btn btn-danger btn-sm" @click="delNail(item.id)"><span title="icon name" aria-hidden="true" class="oi oi-circle-x mr-2"></span>Удал.</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="nailList.length">
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
    import { ModalPlugin } from 'bootstrap-vue'
    import { PaginationPlugin } from 'bootstrap-vue'
    import {mapGetters} from "vuex";

    Vue.use(PaginationPlugin)
    Vue.use(ModalPlugin)

    export default {
        name: "Nails",
        data() {
            return {
                nailList: [],
                totalItems: 0,
                currentPage: 1,
                perPage: 9
            }
        },
        created () {
            this.getList()
        },
        computed: {
            // TODU сделать статически
            ...mapGetters({
                statusOptions: 'chessnails/getStatusOptions'
            })
        },
        methods: {
            getList() {
                const app = this;
                appApi.getNails(app.currentPage)
                    .then((response) => {
                        app.nailList = response.data.data;
                        app.totalItems = response.data.total;
                        app.perPage = response.data.per_page;
                        app.nailList.forEach(function(item, i) {
                            app.nailList[i].status = app.statusOptions[app.nailList[i].status]
                        });
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
