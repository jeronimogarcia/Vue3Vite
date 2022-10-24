<template>
  <div class="flex flex-row justify-center">
    <div>
      <NavBar />
    </div>
    <div class="ml-48 mr-48 pl-14">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from "./components/Header/NavBar.vue";
</script>

<style scoped>
</style>
