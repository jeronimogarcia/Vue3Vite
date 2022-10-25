<template>
  <div class="flex flex-row mt-4 mb-4 mr-8 ml-8">
    <div class="w-1/3">
      <div>
        <span class="text-2xl">
          <font-awesome-icon icon="fa-solid fa-hourglass" />
        </span>
        <span class="text-2xl text-blue-500 font-semibold ml-3">{{
          product.time
        }}</span>
      </div>
      <p class="text-xl">Minutos</p>
    </div>
    <div class="w-1/3 mr-4 ml-4">
      <div>
        <span class="text-2xl">
          <font-awesome-icon icon="fa-solid fa-sack-dollar" />
        </span>
        <span class="text-2xl text-blue-500 font-semibold"
          >${{ product.price }}</span
        >
      </div>
      <p class="text-xl">Precio</p>
    </div>
    <div class="w-1/3">
      <div>
        <span class="text-2xl">
          <font-awesome-icon icon="fa-solid fa-users" />
        </span>
        <span class="text-2xl text-blue-500 font-semibold ml-3">{{
          product.serving
        }}</span>
      </div>
      <p class="text-xl">Serving</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>

<style scoped></style>
