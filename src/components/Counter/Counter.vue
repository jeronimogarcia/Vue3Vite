<template>
  <div class="flex flex-col items-center mt-6" v-if="chart">
    <div class="flex flex-row">
      <p class="text-lg font-medium pr-1">Cantidad:</p>
      <span class="text-lg font-medium pr-4">{{ counter }}</span>
      <button class="buttonBoth mr-2" @click="decrement()">
        <font-awesome-icon
          icon="fa-solid fa-minus"
          class="pr-2 relative bottom-2.5 iconButton"
        />
      </button>
      <button class="buttonBoth mr-2" @click="increment(product)">
        <font-awesome-icon
          icon="fa-solid fa-plus"
          class="pr-2 relative bottom-2.5 iconButton"
        />
      </button>
    </div>
    <div class="mt-2">
      <button
        class="text-lg font-medium buttonStyle"
        @click="goToChart(product, counter)"
      >
        Agregar al carrito
      </button>
    </div>
  </div>
  <div class="flex flex-col items-center mt-6" v-else>
    <router-link to="/chart">
      <button class="text-lg font-medium buttonStyle" >Ir al carrito</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from "../../stores/products";

defineProps({
  product: Object,
});

const productStore = useProductsStore();
const counter = ref(1);
const chart = ref(true);

const goToChart = (product, counter) => {
  chart.value = !chart.value;
  productStore.addProductsToChart(product, counter);
};
const increment = (p) => {
  if (counter.value < p.quantity) {
    counter.value++;
  }
};
const decrement = () => {
  if (counter.value > 1) counter.value--;
};
</script>

<style scoped>
.buttonStyle {
  width: 300px;
  background-color: #4187f6;
  padding: 5px 0px 5px 0px;
  border-radius: 15px;
  color: white;
}
.buttonStyle:hover {
  background-color: black;
  color: yellow;
}

.iconButton {
  position: relative;
  top: 1.5px;
  left: 4px;
  font-size: 1.25rem;
}

.buttonBoth {
  border: 2px solid black;
  position: relative;
  bottom: 6px;
  border-radius: 16px;
}

.buttonBoth:hover {
  background-color: black;
}
.iconButton:hover {
  color: white;
}
</style>
