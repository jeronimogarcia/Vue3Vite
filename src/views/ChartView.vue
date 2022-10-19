<template>
  <div v-for="product in userStore.purchases" :key="product.id">
    <img :src="product.image" :alt="product.title" />
    <h3>{{ product.title }}</h3>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { userUserStore } from "../stores/userStore";
const userStore = userUserStore();
onMounted(() => userStore.getLocalStorage());
</script>

<style scoped></style>
