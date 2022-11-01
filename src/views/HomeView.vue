<template>
  <div class="mb-10 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Nuestras Delicias</h1>
  </div>
  <div class="flex flex-wrap flex-row justify-center ">
    <div
      class="flex flex-col background box-border relative"
      v-for="(product, index) in productsStore.products"
      :key="product.id"
    >
      <div class="min-w-max max-h-72">
        <img
          class="w-full imageBackground"
          :src="product.image"
          :alt="product.title"
        />
      </div>
      <div class="mt-4 ml-8 mr-8 pb-5 border-b border-neutral-500">
        <h3 class="text-2xl font-semibold text-center">
          {{ product.title }}
        </h3>
      </div>
      <Details :product="product"></Details>
      <div>
        <p class="text-lg font-normal leading-tight ml-8 mr-8">
          {{ product.description }}
        </p>
      </div>
      <div class="mt-4 flex justify-center backgroundButton">
        <router-link v-bind:to="'/product/' + product.id"
          ><button class="buttonStyle">Detalle</button></router-link
        >
      </div>
      <div v-if="product.id > 10">
        <button class="buttonStyle eliminate" @click="userStore.deleteProductDatabase(product.id, index)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Details from "../components/Details/Details.vue";
import { useProductsStore } from "../stores/products";
import { userUserStore } from "../stores/userStore";

const productsStore = useProductsStore();
const userStore = userUserStore();

onMounted(() => productsStore.getProducts());
</script>

<style scoped>
.background {
  background-color: #fefafa;
  width: 400px;
  box-shadow: 0 0 88px 0 rgb(0 0 0 / 16%);
  margin: 30px;
}

.backgroundButton {
  background-color: #4187f6;
}

.buttonStyle {
  padding: 8px 0px 8px 0px;
  font-weight: 600;
  background-color: #4187f6;
  color: white;
  font-size: 18px;
  width: 400px;
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.buttonStyle:hover {
  transform: translateY(-3px);
  box-shadow: 0px 10px 34px 20px rgba(79, 173, 255, 0.32);
  color: #2b343b;
}

.imageBackground {
  box-shadow: 0px 0px 130px 0 rgb(0 0 0 / 38%);
  height: 280px;
  max-width: 400px;
}

img {
  border-bottom: 1px solid #31303080;
}

.eliminate {
  position: absolute;
  top: 0px;
}
</style>
