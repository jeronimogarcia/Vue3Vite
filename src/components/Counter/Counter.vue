<template>
  <div class="flex flex-col items-center mt-10">
    <div class="flex flex-row">
      <p class="text-lg font-medium pr-1">Cantidad:</p>
      <span class="text-lg font-medium pr-4">{{ counter }}</span>
      <button @click="decrement()">
        <font-awesome-icon
          icon="fa-solid fa-circle-minus"
          class="pr-2 text-4xl relative bottom-2.5"
        />
      </button>
      <button @click="increment(product)">
        <font-awesome-icon
          icon="fa-solid fa-circle-plus"
          class="pr-2 text-4xl relative bottom-2.5"
        />
      </button>
    </div>
    <div>
      <button @click="productStore.addProductsToChart(product, counter)">
        Agregar al Carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from '../../stores/products';

defineProps({
  product: Object,
});

const productStore = useProductsStore();
const counter = ref(1);
const increment = (p) => {
  if (counter.value < p.quantity) {
    counter.value++;
  }
};
const decrement = () => {
  if (counter.value > 1) counter.value--;
};
</script>

<style scoped></style>
