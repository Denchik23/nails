<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <p>Страница не найдена!</p>
                <router-link :to="{name: 'NailAdd'}" class="btn btn-primary btn-lg mt-5 btn-block">Записать клиента</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>
