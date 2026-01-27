<script setup lang="ts"></script>

<template>

  <header>
    <div class="navigation">

      <div class="navigation-item">
        <h3>
          LogiLearn
        </h3>
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