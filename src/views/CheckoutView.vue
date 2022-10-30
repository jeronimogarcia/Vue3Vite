<template>
  <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Checkout</h1>
  </div>
  <div class="formContainer rounded" v-if="userStore.purchases.length != 0">
    <form class="flex flex-col p-10" @submit.prevent="handleSubmit">
      <h2 class="text-2xl text-white">Checkout Form</h2>
      <span class="text-lg mt-6 mb-2 text-white">Email</span>
      <input
        class="rounded"
        type="name"
        v-model="state.email"
        label="Username"
      />
      <span class="errors" v-for="error in v$.email.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>

      <span class="text-lg mt-6 mb-2 text-white">Teléfono</span>
      <input
        class="rounded"
        type="number"
        v-model="state.phone"
        label="Password"
      />
      <span class="errors" v-for="error in v$.phone.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>

      <button
        class="text-left text-lg mt-10 mb-2 text-white buttonStyle"
        type="submit"
      >
        Efectuar Compra
      </button>
      <span
        class="errors"
        v-if="(v$.email.$errors.length != 0) | (v$.phone.$errors.length != 0)"
      >
        Completar los campos correctamente.
      </span>
      <span class="errors" v-if="userStore.loginFailed">
        Email o Password incorrectos. Vuelve a intentar.
      </span>
    </form>
  </div>
  <div class="flex flex-col items-center" v-else>
    <h2 class="mb-4 text-2xl font-medium">Compra realizada con éxito</h2>
    <h3 class="mb-4 text-lg font-medium">Aquí tiene su número de Ticket:</h3>
    <span class="mb-4 text-lg font-medium">{{userStore.purchasedId}}</span>
    <router-link to="/"
      ><button  class="buttonStyles">Volver al Home</button></router-link
    >
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";
import { userUserStore } from "../stores/userStore";

onMounted(() => userStore.getLocalStorage());

const userStore = userUserStore();

const state = reactive({
  email: "pepe@hotmail.com",
  phone: "222222222222",
});

const rules = {
  email: {
    required: helpers.withMessage("Este campo es obligatorio", required),
    email: helpers.withMessage("Debe ser formato de email", email),
  },
  phone: {
    required: helpers.withMessage("Este campo es obligatorio", required),
    minLength: helpers.withMessage(
      "Debe tener 10 caracteres como mínimo",
      minLength(10)
    ),
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await userStore.setCompra(state.email, state.phone);
  }
};
</script>

<style scoped>
.formContainer {
  width: 600px;
  background-color: #2b343b;
}

.buttonStyle {
  display: flex;
  justify-content: center;
  background-color: #4187f6;
  width: 160px;
  border-radius: 6px;
}

.buttonStyle:hover {
  color: yellow;
}

.errors {
  color: red;
  margin-top: 10px;
}

.buttonStyles {
  width: 300px;
  background-color: #4187f6;
  padding: 5px 0px 5px 0px;
  border-radius: 15px;
  color: white;
}
</style>
