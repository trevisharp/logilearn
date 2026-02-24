<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const store = useUserStore()

onMounted(async () => {
    await store.loadProfile()
})

</script>

<template>
    <div v-if="!store.logged">
        <h1> Carregando dados do usuário... </h1>
    </div>

    <div v-if="store.logged" class="container">
        <h1> Bem-vindo {{ store.username }} ({{ store.login }})! </h1>
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100%;
}

h1 {
    margin: 0px;
}
</style>