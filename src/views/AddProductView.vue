<template>
  <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Agregar producto</h1>
  </div>

  <div class="formContainer rounded">
    <form class="flex flex-col p-10" @submit.prevent="handleSubmit">
      <h2 class="text-2xl text-white">Add Product Form</h2>

      <span class="text-lg mt-6 mb-2 text-white">Title</span>
      <input class="rounded" type="name" v-model="state.title" label="Title" />
      <span class="errors" v-for="error in v$.title.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>

      <span class="text-lg mt-6 mb-2 text-white">Price</span>
      <input
        class="rounded"
        type="number"
        v-model="state.price"
        label="price"
      />
      <span class="errors" v-for="error in v$.price.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>

      <span class="text-lg mt-6 mb-2 text-white">Tiempo de preparación</span>
      <input
        class="rounded"
        type="number"
        v-model="state.time"
        label="Password"
      />
      <span class="errors" v-for="error in v$.time.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>

      <span class="text-lg mt-6 mb-2 text-white">Porción</span>
      <input
        class="rounded"
        type="number"
        v-model="state.serving"
        label="Serving"
      />
      <span
        class="errors"
        v-for="error in v$.serving.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>

      <span class="text-lg mt-6 mb-2 text-white">Descripción</span>
      <textarea
        class="rounded"
        type="name"
        v-model="state.description"
        label="Description"
      />
      <span
        class="errors"
        v-for="error in v$.description.$errors"
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
          Agregar
        </button>
        <Spinner class="mt-10" v-if="userStore.isLoading" />
      </div>

      <span
        class="errors"
        v-if="
          (v$.title.$errors.length != 0) |
            (v$.price.$errors.length != 0) |
            (v$.time.$errors.length != 0) |
            (v$.serving.$errors.length != 0) |
            (v$.description.$errors.length != 0)
        "
      >
        Completar los campos correctamente.
      </span>
    </form>
  </div>
</template>

<script setup>
import Spinner from "../components/Spinner/Spinner.vue";
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  helpers,
  between,
} from "@vuelidate/validators";
import { userUserStore } from "../stores/userStore";

const userStore = userUserStore();

const state = reactive({
  title: "",
  price: "",
  time: "",
  serving: "",
  description: "",
});

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage("Mínimo 6 caracteres", minLength(6)),
    },
    price: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      between: helpers.withMessage(
        "Debe ser entre 500 a 2500",
        between(500, 2500)
      ),
    },
    time: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      between: helpers.withMessage("Debe ser entre 15 a 45", between(15, 45)),
    },
    serving: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      between: helpers.withMessage("Debe ser entre 1 a 4", between(1, 4)),
    },
    description: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage("Mínimo 95 caracteres", minLength(100)),
      maxLength: helpers.withMessage("Máximo 140 caracteres", maxLength(140)),
    },
  };
});

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await userStore.addProduct(state.title, state.price, state.time, state.serving, state.description);
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
