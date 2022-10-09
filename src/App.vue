<template>
  <div>
    <h1>Vue App</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <button @click="userStore.logoutUser">Logout</button>
    </nav>
    <router-view/>
  </div>
</template>

<script setup>
import {userUserStore} from './stores/userStore'
const userStore = userUserStore()

</script>

<style scoped>

</style>
