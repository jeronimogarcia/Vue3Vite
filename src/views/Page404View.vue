<template>
    <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Fallo de routing</h1>
  </div>
  <div class="imgContainer">
    <img src="../assets/error404.png" alt="">
  </div>
  <div class="flex justify-center mt-10">
    <router-link to="/"
        ><button  class="buttonStyle">Volver al Home</button></router-link
      >
  </div>
</template>

<script setup>

</script>

<style  scoped>
.imgContainer{
  border: 1px solid black;
  border-radius: 50px;
  overflow: hidden;
}

img{
    background-color: red;
}

.buttonStyle {
  width: 300px;
  background-color: #4187f6;
  padding: 5px 0px 5px 0px;
  border-radius: 15px;
  color: white;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.buttonStyle:hover {
  background-color: black;
  color: yellow;
}
</style>