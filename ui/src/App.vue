<script setup lang="ts">
import router from './router';
import { useUserStore } from './stores/userStore';
import { ElButton  } from 'element-plus';

const user = useUserStore()

</script>

<template>

  <header>
    <div class="navigation">

      <div class="navigation-item">
        <h3>
          LogiLearn
        </h3>
      </div>

      <div class="navigation-item" v-if="!user.logged">
        <el-button v-on:click="() => router.push({ path: '/login' })">Login</el-button>
      </div>
      
    </div>
  </header>

  <main>
    <RouterView/>
  </main>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');

.navigation {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.navigation-item {
  margin: 20px;
}

header {
  color: white;
  background-color: rgb(12, 12, 12);
  width: 100vw;
  height: 80px;
  
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight: 16;
  font-style: normal;

}

main {
  color: white;
  background-color: rgb(25, 25, 25);
  width: 100vw;
  height: calc(100vh - 80px);
  
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight: 12;
  font-style: normal;
}
</style>