<template>
  <div class="">
    <div class="mb-10 mt-10 pl-2 flex justify-center">
      <h1 class="font-semibold text-6xl">Nuestras Delicias</h1>
    </div>
    <div class="flex flex-wrap flex-row">
      <div
        class="flex flex-col background box-border"
        v-for="product in productsStore.products"
        :key="product.id"
      >
        <div class="min-w-max max-h-72">
          <img class="w-full imageBackground" :src="product.image" :alt="product.title" />
        </div>
        <div class="mt-4 ml-8 mr-8 pb-5 border-b border-neutral-500">
          <h3 class="text-2xl font-semibold text-center">{{ product.title }}</h3>
        </div>
        <div class="flex flex-row mt-4 mb-4 mr-8 ml-8">
          <div class="w-1/3">
            <div>
              <span class="text-2xl">
                <font-awesome-icon icon="fa-solid fa-hourglass" />
              </span>
              <span class="text-2xl text-blue-500 font-semibold ml-3">{{product.time}}</span>
            </div>
            <p class="text-xl">Minutos</p>
          </div>
          <div class="w-1/3 mr-4 ml-4">
            <div>
              <span class="text-2xl">
                <font-awesome-icon icon="fa-solid fa-sack-dollar" />
              </span>
              <span class="text-2xl text-blue-500 font-semibold">${{product.price}}</span>
            </div>
            <p class="text-xl">Precio</p>
          </div>
          <div class="w-1/3">
            <div>
              <span class="text-2xl">
                <font-awesome-icon icon="fa-solid fa-users" />
              </span>
              <span class="text-2xl text-blue-500 font-semibold ml-3">{{product.serving}}</span>
            </div>
            <p class="text-xl">Serving</p>
          </div>
        </div>
        <div>
          <p class="text-lg font-normal leading-tight ml-8 mr-8">{{ product.description }}</p>
        </div>
        <div class="mt-4  flex justify-center backgroundButton">
          <button class="buttonStyle" @click="productsStore.addProductsToChart(product)">
            Detalle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "../stores/products";
const productsStore = useProductsStore();
onMounted(() => productsStore.getProducts());
</script>

<style scoped>
.background{
  background-color: #fefafa;
  width: 400px;
  box-shadow: 0 0 88px 0 rgb(0 0 0 / 16%);
  margin: 30px;
}

.backgroundButton{
  background-color: #4187f6;
}

.buttonStyle{
  padding: 8px 0px 8px 0px;
  font-weight: 600;
  background-color: #4187f6;
  color: white;
  font-size: 18px;
  width: 400px;
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.buttonStyle:hover{
  transform: translateY(-3px);
  box-shadow: 0px 10px 34px 20px rgba(79, 173, 255, 0.32);
  color: #2b343b;
}

.imageBackground{
  box-shadow: 0px 0px 130px 0 rgb(0 0 0 / 38%);
  height: 280px;
  max-width: 400px;
}
</style>
