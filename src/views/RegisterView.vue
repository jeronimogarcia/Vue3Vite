<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Ingrese email" v-model="email" />
      <input
        type="password"
        placeholder="Ingrese Password"
        v-model="password"
      />
      <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
    </form>
  </div>
</template>

<script setup>
import { userUserStore } from "../stores/userStore";
import { ref } from "vue";
// import { useRouter } from 'vue-router'

const userStore = userUserStore();
// const router = useRouter()
const email = ref('pepe@hotmail.com');
const password = ref('12345678');

const handleSubmit = async () => {
  await userStore.registerUser(email.value, password.value);
//   router.push('/')
};
</script>

<style scoped></style>
