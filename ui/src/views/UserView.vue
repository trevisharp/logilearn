<script setup lang="ts">
import { http } from '@/services/http';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const store = useUserStore()

onMounted(async () => {
    await store.loadProfile()
    await http.get("/gists")
})


const openGit = () => {
    window.location.href = store.github
}
</script>

<template>
    <div v-if="!store.logged">
        <h1> Carregando dados do usuário... </h1>
    </div>

    <div v-if="store.logged" class="container">
        <h1> Bem-vindo {{ store.username }} ({{ store.login }})! </h1>
        <div class="userdata">
            <div class="userphoto">
                <img :src="store.avatarurl" class="photo"
                    @click="openGit" style="cursor: pointer;">
            </div>
            <div class="usergists">
                <h2>Seus gists</h2>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100%;
}

h1 {
    margin: 0px;
}

.userdata {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.userphoto {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.photo {
    width: 50%;
}

.usergists {
    flex-grow: 4;
}
</style>