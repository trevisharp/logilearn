<script lang="ts" setup>
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
    const code = router.currentRoute.value.params.token as string;
    sessionStorage.setItem("csrf-token", code)
    router.push("/profile")
})

</script>

<template>
    <h1>Finalizando login...</h1>
</template>