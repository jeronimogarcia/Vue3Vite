<template>
  <div class="navigation" v-if="!userStore.loadingSession">
    <ul>
      <li class="list" v-if="userStore.userData">
        <router-link to="/">
          <span class="icon">  <font-awesome-icon icon="fa-solid fa-house" /> </span>
          <span class="list">Home</span>
        </router-link>
      </li>
      <li class="list" v-if="!userStore.userData">
        <router-link to="/login">
          <span class="icon"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></span>
          <span class="list">Login</span>
        </router-link>
      </li>
      <li class="list" v-if="!userStore.userData">
        <router-link to="/register">
          <span class="icon"><font-awesome-icon icon="fa-solid fa-user-plus" /></span>
          <span class="list">Register</span>
        </router-link>
      </li>
      <li class="list" v-if="userStore.userData">
        <router-link to="/chart"
          ><span class="icon"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></span>
          <span class="list">Carrito</span>
        </router-link>
      </li>
      <li class="list" v-if="userStore.userData">
        <button class="underline w-3" @click="userStore.logoutUser" v-if="userStore.userData">
      Logout
    </button>
      </li>
    </ul>
  </div>
  <div v-else>loading user...</div>
</template>

<script setup>
import { userUserStore } from "../../stores/userStore";
const userStore = userUserStore();
</script>

<style scoped>
</style>
