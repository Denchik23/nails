<template>
    <div>
        <b-modal v-bind:id="formId" v-bind:title="title" @ok="handleOk">
            <form @submit.stop.prevent="handleSubmit" class="needs-validation" novalidate>
                <div class="form-group">
                    <label for="name">Имя клиента</label>
                    <input type="text" class="form-control" id="name" placeholder="Введите имя клиента" name="name" v-model="$v.data.name.$model" :class="{ 'is-invalid': $v.data.name.$error }">
                    <div class="invalid-feedback">Введите имя клиента</div>
                </div>
                <div class="form-group">
                    <label for="phone">Телефон клиента</label>
                    <the-mask mask="+7 (###) ###-##-##" :ref="'phone'" class="form-control" id="phone" type="tel"
                              placeholder="+7 (918) 888-77-55" v-model="$v.data.phone.$model" :class="{ 'is-invalid': $v.data.phone.$error }"></the-mask>
                    <div class="invalid-feedback">Введите телефон клиента</div>
                </div>
                <div class="form-group">
                    <label for="description">Комментарий</label>
                    <input type="text" class="form-control" id="description" name="description" v-model="$v.data.description.$model" :class="{ 'is-invalid': $v.data.description.$error }">
                    <div class="invalid-feedback">Максимальная длинна 255 символов</div>
                    <small id="emailHelp" class="form-text text-muted">Комментариями можно помечать важных клиентов.</small>
                </div>
            </form>
            <template #modal-footer="{ ok, cancel }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <button type="button" class="btn btn-success" @click="ok()">Сохранить</button>
                <button type="button" class="btn btn-danger" @click="cancel()">Отмена</button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { ModalPlugin } from 'bootstrap-vue'
    import Vuelidate from 'vuelidate'
    import {maxLength, required} from "vuelidate/lib/validators";
    import { validationUtils } from '../../utils/validationUtils'
    import { TheMask } from 'vue-the-mask'
    import {appApi} from "../../api/appApi";
    import store from "../../store";

    Vue.use(Vuelidate)
    Vue.use(ModalPlugin)

    const validPhone = (value) => validationUtils.phone(value)

    export default {
        name: "ModalFormClient",
        props: {
            formId: String,
            apiClient: String,
            dataEdit: Object,
            title: String,
            callbackAction: Function
        },
        data() {
            return {
                data: null,
                flagEdit: false,
                defaultData: {
                    name: '',
                    phone: '',
                    description: ''
                }
            }
        },
        validations () {
            return {
                data: {
                    name: {
                        required
                    },
                    phone: {
                        required,
                        validPhone
                    },
                    description: {
                        maxLength: maxLength(255)
                    }
                }
            }
        },
        created() {
            if (this.dataEdit !== undefined) {
                this.data = Object.assign({}, this.dataEdit)
                this.flagEdit = true
            } else {
                this.data = Object.assign({}, this.defaultData)
            }
        },
        methods: {
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },
            handleSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    appApi.[this.apiClient](this.data)
                        .then((response) => {
                            if (response.data.status) {
                                this.$nextTick(() => {
                                    this.$bvModal.hide(this.formId)
                                })
                                store.dispatch('alert/success', response.data.message)
                                if (!this.flagEdit) {
                                    this.resetModal();
                                }
                                if (this.callbackAction) {
                                    this.callbackAction()
                                }
                            } else {
                                store.dispatch('alert/danger', response.data.message)
                            }
                        })
                        .catch(e => {
                            store.dispatch('handle', e)
                        });
                }
            },
            resetModal() {
                this.data.name = '';
                this.data.phone = '';
                this.data.description = '';
            }
        },
        components: {
            TheMask
        }
    }
</script>

<style scoped>

</style>
