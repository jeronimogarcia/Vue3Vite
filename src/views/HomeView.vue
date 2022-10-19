<template>
  <div v-for="product in productsStore.products"  :key="product.id">
    <img :src="product.image" :alt="product.title" />
    <h3>{{ product.title }}</h3>
    <button @click="productsStore.addProductsToChart(product)">Agregar</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "../stores/products";
const productsStore = useProductsStore();
onMounted(() => productsStore.getProducts());
</script>

<style scoped></style>
