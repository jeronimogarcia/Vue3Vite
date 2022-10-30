<template>
  <div class="mb-10 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Checkeo de Compras</h1>
  </div>

  <div class="flex flex-col items-center">
    <div class="formContainer rounded">
      <form class="flex flex-col p-10" @submit.prevent="handleSubmit">
        <h2 class="text-2xl text-white">Ticket Form</h2>
        <span class="text-lg mt-6 mb-2 text-white">Número de ticket</span>
        <input
          class="rounded"
          type="name"
          v-model="state.ticket"
          label="Username"
        />
        <span
          class="errors"
          v-for="error in v$.ticket.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </span>
        <button
          class="text-left text-lg mt-10 mb-2 text-white buttonStyle"
          type="submit"
        >
          Check
        </button>
      </form>
    </div>

    <div v-if="userStore.ticketList.length > 0" class="flex flex-col justify-center mt-10 mb-2">
     <h2 class="text-2xl text-center mb-4 font-semibold">Ticket: {{state.ticket}}</h2>
      <table class="tableStyle">
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Foto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>SubTotal</th>
        </thead>
        <tbody>
          <tr
            v-for="producto in userStore.ticketList"
            :key="producto.id"
            :producto="producto"
          >
            <td>{{ producto.id }}</td>
            <td>{{ producto.title }}</td>
            <td class="cartImage">
              <img :src="producto.image" :alt="producto.image" />
            </td>
            <td>${{ producto.price }}</td>
            <td>{{ producto.bought }}</td>
            <td>$ {{ producto.bought * producto.price }}</td>
          </tr>
        </tbody>
        <thead>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>Total Unidades</th>
          <th>Total Compra</th>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ calculoCantidad() }} unidades</td>
            <td>$ {{ calculoTotal() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { userUserStore } from "../stores/userStore";

const userStore = userUserStore();

const state = reactive({
  ticket: "",
});

const rules = {
  ticket: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await userStore.getTicketLista(state.ticket);
  }
};

const calculoTotal = () => {
  return userStore.ticketList.reduce((suma, item) => {
    return suma + item.bought * item.price;
  }, 0);
};

const calculoCantidad = () => {
  return userStore.ticketList.reduce((suma, item) => {
    return suma + item.bought;
  }, 0);
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
}

.buttonStyle:hover {
  color: yellow;
}

.errors {
  color: red;
  margin-top: 10px;
}

.tableStyle {
  caption-side: bottom;
  border-collapse: collapse;
  width: 950px;
}

table thead {
  font-size: 24px;
}

table tr {
  border-top: 1px solid #000;
  padding-top: 5px;
  height: 120px;
}

table td {
  font-size: 22px;
}

table th {
  padding-right: 10px;
  text-align: start;
}

.cartImage {
  width: 150px;
}
</style>
