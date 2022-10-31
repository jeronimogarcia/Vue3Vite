<template>
  <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Login de usuario</h1>
  </div>
  <div class="formContainer rounded">
    <form class="flex flex-col p-10" @submit.prevent="handleSubmit">
      <h2 class="text-2xl text-white">Login User Form</h2>
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
      <span class="text-lg mt-6 mb-2 text-white">Password</span>
      <input
        class="rounded"
        type="password"
        v-model="state.password"
        label="Password"
      />
      <span
        class="errors"
        v-for="error in v$.password.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
      <div class="flex flex-row">
        <button
          class="text-left text-lg mt-10 mr-4 text-white buttonStyle"
          :class="{ disable: userStore.isLoading }"
          :disabled="userStore.isLoading"
          type="submit"
        >
          Login
        </button>
        <SpinnerVue class="mt-10" v-if="userStore.isLoading" />
      </div>
      <b-spinner label="Spinning"></b-spinner>
      <span
        class="errors"
        v-if="
          (v$.email.$errors.length != 0) | (v$.password.$errors.length != 0)
        "
      >
        Completar los campos correctamente.
      </span>
      <span class="errors" v-if="userStore.loginFailed">
        Email o Password incorrectos. Vuelve a intentar.
      </span>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { userUserStore } from "../stores/userStore";
import SpinnerVue from "../components/Spinner/Spinner.vue";

const userStore = userUserStore();

const state = reactive({
  email: "jero_garcia23@hotmail.com",
  password: "2222222222",
});

const rules = {
  email: {
    required: helpers.withMessage("Este campo es obligatorio", required),
    email: helpers.withMessage("Debe ser formato de email", email),
  },
  password: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await userStore.loginUser(state.email, state.password);
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
  width: 80px;
  border-radius: 6px;
  height: 30px;
}

.buttonStyle:hover {
  color: yellow;
}

.errors {
  color: red;
  margin-top: 10px;
}

.disable {
  opacity: 0.3;
}
</style>
