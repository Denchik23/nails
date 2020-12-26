<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link :to="{name: 'Dashboard'}">Главная</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{pageTitle()}}</li>
        </ol>
    </nav>
</template>

<script>
    export default {
        name: "Breadcrumb",
        data() {
            return {
                pageTitle: function () {
                    if (this.$route.meta.title) {
                        return this.$route.meta.title
                    } else {
                        return ''
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
