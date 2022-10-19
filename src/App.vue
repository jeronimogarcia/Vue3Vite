<template>
  <div>
    <h1>Vue App</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home</router-link>
      <router-link to="/login" v-if="!userStore.userData">Login</router-link>
      <router-link to="/register" v-if="!userStore.userData">Register</router-link>
      <router-link to="/chart" v-if="userStore.userData">Carrito</router-link>
      <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>
      loading user...
    </div>
    <router-view/>
  </div>
</template>

<script setup>
import {userUserStore} from './stores/userStore'
const userStore = userUserStore()

</script>

<style scoped>

</style>
