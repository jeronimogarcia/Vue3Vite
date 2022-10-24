<template>
  <div class="mb-10 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Detalle del Producto</h1>
  </div>
  <article class="flex justify-center articleContainer">
    <div class="flex content-center w-2/4 imageContainer">
      <h2>{{ detailStore.product.title }}</h2>
    </div>
    <div class="informationContainer w-2/4 pl-8 pt-3"></div>
  </article>
</template>

<script setup>

import { onMounted } from "vue";
import { useDetail } from "../stores/detail";

const detailStore = useDetail();
onMounted(() => detailStore.getProductOnMounted());

</script>

<style scoped>
.articleContainer {
  width: 950px;
  border-top: 1px solid #000;
}

.imageContainer {
  height: 500px;
}

.informationContainer {
  height: 500px;
  border-left: 1px solid #000;
}
</style>
