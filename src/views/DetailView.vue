<template>
  <div class="mb-10 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Detalle del Producto</h1>
  </div>
  <article class="flex justify-center articleContainer">
    <div class="flex flex-col content-center w-2/4 imageContainer">
      <h2 class="flex justify-center mb-5 mt-5 text-4xl font-medium">
        {{ detailStore.product.title }}
      </h2>
      <div class="flex justify-center">
        <img :src="detailStore.product.image" class="imageClass" />
      </div>
      <p class="text-lg font-medium pl-9 pr-9 mt-5">
        {{ detailStore.product.description }}
      </p>
    </div>
    <div class="informationContainer w-2/4 pl-8 pt-4">
      <h3 class="flex justify-center mb-1 mt-1 text-2xl font-medium">
        Puntuación
      </h3>
      <div class="flex flex-row">
        <span class="text-lg font-medium pr-2">Sabor:</span>
        <span class="stars" v-for="i in crearLista(detailStore.product.taste)" :key="i">
            <font-awesome-icon icon="fa-solid fa-star" />
        </span>
      </div>
      <div class="flex flex-row">
        <span class="text-lg font-medium pr-2">Fragancia:</span>
        <span class="stars" v-for="i in crearLista(detailStore.product.fragrance)" :key="i">
            <font-awesome-icon icon="fa-solid fa-star" />
        </span>
      </div>
      <div class="flex flex-row">
        <span class="text-lg font-medium pr-2">Calidad:</span>
        <span class="stars" v-for="i in crearLista(detailStore.product.quality)" :key="i">
            <font-awesome-icon icon="fa-solid fa-star" />
        </span>
      </div>
      <div class="flex flex-row">
        <span class="text-lg font-medium pr-2">Saludable:</span>
        <span class="stars" v-for="i in crearLista(detailStore.product.healthy)" :key="i">
            <font-awesome-icon icon="fa-solid fa-star" />
        </span>
      </div>
      <h3 class="flex justify-center mb-4 mt-4 text-2xl font-medium">
        Características
      </h3>
      <Details :product = detailStore.product></Details>
      <div class="mt-6">
        <span class="text-lg font-medium pr-1">Stock disponible: </span>
        <span class="text-lg font-medium">{{detailStore.product.quantity}} unidades</span>
      </div>
      <Counter :product = detailStore.product></Counter>
    </div>
  </article>
</template>

<script setup>
import { onMounted } from "vue";
import { useDetail } from "../stores/detail";
import Details from '../components/Details/Details.vue'
import Counter from '../components/Counter/Counter.vue'

const detailStore = useDetail();
const crearLista = (propiedad) => {
    let lista = [];
      let num = Math.round(propiedad / 2);
      for(let i=0; i<num; i++){
        lista.push(i)
      };
      return lista
}
onMounted(() => detailStore.getProductOnMounted());
</script>

<style scoped>
.articleContainer {
  width: 950px;
  border-top: 1px solid #000;
}

.imageContainer {
  height: 480px;
}

.informationContainer {
  height: 480px;
  border-left: 1px solid #000;
}

.imageClass {
  width: 405px;
}

.stars{
    color: orange;
}
</style>
