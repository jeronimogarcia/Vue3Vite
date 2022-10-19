<template>
  <div class="appContainer">
    <div class="navBar">
      <NavBar />
      <button class="w-30 bg-rose-500">Primary button</button>
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
