<template>
  <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Registro de usuario</h1>
  </div>
  <div class="formContainer rounded">
    <form class="flex flex-col p-10" @submit.prevent="handleSubmit">
      <h2 class="text-2xl text-white">Register User Form</h2>

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

      <span class="text-lg mt-6 mb-2 text-white">Repetir Password</span>
      <input
        class="rounded"
        type="password"
        v-model="state.samePassword"
        label="Password"
      />
      <span
        class="errors"
        v-for="error in v$.samePassword.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>

      <div class="flex flex-row">
        <button
          class="text-left text-lg mt-10 mr-4 text-white buttonStyle"
          type="submit"
          :class="{ disable: userStore.isLoading }"
          :disabled="userStore.isLoading"
        >
          Registrar
        </button>
        <Spinner class="mt-10" v-if="userStore.isLoading" />
      </div>

      <span
        class="errors"
        v-if="
          (v$.email.$errors.length != 0) |
            ((v$.password.$errors.length != 0) |
              (v$.samePassword.$errors.length != 0))
        "
      >
        Completar los campos correctamente.
      </span>
      <span class="errors" v-if="userStore.registerFailed">
        Email ya utilizado. Por favor ingrese otro.
      </span>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { userUserStore } from "../stores/userStore";
import Spinner from "../components/Spinner/Spinner.vue";

const userStore = userUserStore();

const state = reactive({
  email: "",
  password: "",
  samePassword: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      email: helpers.withMessage("Debe ser formato de email", email),
    },
    password: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage(
        "Debe tener 10 caracteres como mínimo",
        minLength(10)
      ),
    },
    samePassword: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      sameAs: helpers.withMessage(
        "Las contraseñas deben coincidir",
        sameAs(state.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await userStore.registerUser(state.email, state.password);
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
  width: 100px;
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
