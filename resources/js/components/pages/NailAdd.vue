<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <form @submit.stop.prevent="handleSubmit" class="needs-validation" novalidate>
                <label>Клиент</label>
                <div class="form-row">
                    <div class="form-group col-10">
                        <multiselect v-model="selectedClient"
                             :options="clients"
                             :loading="isLoading"
                             :internal-search="false"
                             :options-limit="100"
                             :class="{ 'is-invalid': $v.data.client_id.$error }"
                             placeholder="Выберите клиента" label="name" track-by="id" @search-change="asyncFind"
                             @input="selectClient"
                        >
                            <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> тел.<strong>  {{ option.phone }}</strong></template>
                            <span slot="noResult">Клиент не найден!</span>
                            <span slot="noOptions">Список пуст</span>
                        </multiselect>
                        <div class="invalid-feedback">Выберите клиента</div>
                        <small class="form-text text-muted">Если поиск не нашел клиента, вы можете добавить его нажав на <strong>+</strong></small>
                    </div>
                    <div class="form-group col-2 text-right">
                        <button type="button" class="btn btn-primary" @click="$bvModal.show('modal-add-client')"><span title="icon name" aria-hidden="true" class="oi oi-plus"></span></button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="termin-date">Дата</label>
                    <input type="datetime-local" id="termin-date" class="form-control" :class="{ 'is-invalid': $v.data.termin.$error }" v-model="$v.data.termin.$model">
                    <div class="invalid-feedback">Укажите дату и время</div>
                </div>
                <div class="form-group">
                    <label for="comment">Комментарий</label>
                    <textarea class="form-control" :class="{ 'is-invalid': $v.data.description.$error }" id="comment" rows="3" v-model="$v.data.description.$model"></textarea>
                    <div class="invalid-feedback" v-if="!$v.data.description.maxLength">Превышено максимально число символов</div>
                </div>
                <div class="form-row  mt-5">
                    <div class="col">
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Записать</button>
                    </div>
                    <div class="col">
                        <router-link :to="{name: 'Dashboard'}" class="btn btn-danger btn-lg btn-block">Отмена</router-link>
                    </div>
                </div>
            </form>
            <modal-form-client form-id="modal-add-client" title="Добавление нового клиента" api-client="saveClient"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions } from 'vuex'
    import Multiselect from 'vue-multiselect'
    import Vuelidate from 'vuelidate'
    import { required, maxLength } from 'vuelidate/lib/validators'
    import { appApi } from '../../api/appApi'
    import store from "../../store";
    import ModalFormClient from '../actions/ModalFormClient.vue'

    Vue.use(Vuelidate)

    export default {
        name: "NailAdd",
        components: {
            Multiselect,
            ModalFormClient
        },
        data() {
            return {
                selectedClient: [],
                clients: [],
                isLoading: false,
                data: null,
                defaultData: {
                    termin: '',
                    client_id: '',
                    description: ''
                }
            }
        },
        validations () {
            return {
                data: {
                    client_id: {
                        required
                    },
                    termin: {
                        required
                    },
                    description: {
                        maxLength: maxLength(256)
                    }
                }
            }
        },
        created () {
            this.data = Object.assign({}, this.defaultData)
        },
        computed: {
        },
        methods: {
            ...mapActions({
                get_list: 'chessnails/lestNails'
            }),
            asyncFind (query) {
                this.isLoading = true;
                this.get_list(query).then(response => {
                    this.clients = response.data;
                });
                this.isLoading = false
            },
            handleSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    appApi.saveNail(this.data)
                        .then((response) => {
                            if (response.data.status) {
                                store.dispatch('alert/success', response.data.message)
                                router.push({name: 'Base'})
                            } else {
                                store.dispatch('alert/danger', response.data.message)
                            }
                        })
                        .catch(e => {
                            store.dispatch('handle', e)
                        });
                }
            },
            selectClient (client) {
                this.data.client_id = client.id
            }
        }
    }
</script>
<style>
    .is-invalid .multiselect__tags {
        border-color: #e3342f!important;
    }
</style>
