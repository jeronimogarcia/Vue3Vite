<template>
  <div class="appContainer">
    <div class="navBar">
      <NavBar />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/Header/NavBar.vue";
</script>

<style scoped>
.appContainer {
  display: flex;
  flex-direction: row;
}
.navBar {
  width: 400px;
}
</style>
