<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <form @submit.stop.prevent="handleSubmit" class="needs-validation" novalidate>
                <label>Клиент</label>
                <div class="form-group">
                    <multiselect v-model="selectedClient"
                                 :options="clients"
                                 :options-limit="100"
                                 :class="{ 'is-invalid': $v.data.client_id.$error }"
                                 placeholder="Выберите клиента" label="name" track-by="id"
                                 @input="selectClient"
                    >
                        <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> тел.<strong>  {{ option.phone }}</strong></template>
                    </multiselect>
                    <div class="invalid-feedback">Выберите клиента</div>
                </div>
                <div class="form-group">
                    <label for="termin-date">Дата</label>
                    <input type="datetime-local" id="termin-date" class="form-control" :class="{ 'is-invalid': $v.data.termin.$error }" v-model="$v.data.termin.$model">
                    <div class="invalid-feedback">Укажите дату и время</div>
                </div>
                <div class="form-group">
                    <label for="status">Статус</label>
                    <select class="form-control" id="status" v-model="data.status">
                        <option v-for="(option,index) in statusOptions" v-bind:value="index">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div class="form-group disabled">
                    <label for="price">Стоимость &#8381;</label>
                    <input type="number" class="form-control" :class="{ 'is-invalid': $v.data.price.$error }" id="price" v-model="$v.data.price.$model" :readonly="this.data.status === '0'">
                    <div class="invalid-feedback">Если статус "выполнено" то нужно указать цену</div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  id="repair" v-model="data.repair">
                        <label class="form-check-label" for="repair">С ремонтом</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="comment">Комментарий</label>
                    <textarea class="form-control" :class="{ 'is-invalid': $v.data.description.$error }" id="comment" rows="3" v-model="$v.data.description.$model"></textarea>
                    <div class="invalid-feedback" v-if="!$v.data.description.maxLength">Превышено максимально число символов</div>
                </div>
                <div class="form-row  mt-5">
                    <div class="col">
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Сохранить</button>
                    </div>
                    <div class="col">
                        <router-link :to="{name: 'Dashboard'}" class="btn btn-danger btn-lg btn-block">Отмена</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Multiselect from 'vue-multiselect'
    import Vuelidate from 'vuelidate'
    import { required, maxLength, requiredIf } from 'vuelidate/lib/validators'
    import { appApi } from '../../api/appApi'
    import store from "../../store";
    import {mapGetters} from "vuex";

    Vue.use(Vuelidate)

    export default {
        name: "NailEdit",
        components: {
            Multiselect
        },
        props: ['uuid'],
        data() {
            return {
                selectedClient: [],
                clients: [],
                isLoading: false,
                data: null,
                defaultData: {
                    id: '',
                    termin: '',
                    repair: false,
                    client_id: '',
                    description: '',
                    price: 0,
                    status: ''
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
                    price: {
                        required: requiredIf((value) => this.data.status === '1')
                    },
                    description: {
                        maxLength: maxLength(256)
                    }
                }
            }
        },
        created () {
            this.data = Object.assign({}, this.defaultData)
            this.getAllClients()
            this.getCurrentNail()
        },
        computed: {
            ...mapGetters({
                statusOptions: 'chessnails/getStatusOptions'
            })
        },
        methods: {
            handleSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    appApi.updateNail(this.data)
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
            },
            nailFull (values) {
                if (values.length !== 0) {
                    this.data = Object.assign({}, values)
                    if (this.clients.length) {
                        this.selectedClient = this.clients.find(client => client.id === values.client_id)
                    }
                }
            },
            getAllClients () {
                appApi.getAllClients()
                    .then((response) => {
                        this.clients = response.data;
                    })
                    .catch(e => {
                        store.dispatch('handle', e)
                    });
            },
            getCurrentNail () {
                appApi.findOneNail(this.uuid)
                    .then((response) => {
                        this.nailFull(response.data)
                    })
                    .catch(e => {
                        store.dispatch('handle', e)
                    });
            }
        }
    }
</script>

<style scoped>

</style>
