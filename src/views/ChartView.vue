<template>
  <div class="mb-16 mt-10 flex justify-center">
    <h1 class="font-semibold text-6xl">Lista del carrito</h1>
  </div>
  <div v-if="userStore.purchases != 0">
    <div class="flex justify-center">
      <table class="tableStyle">
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Foto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>SubTotal</th>
          <th class="deleteStyle">Eliminar</th>
        </thead>
        <tbody>
          <tr
            v-for="(producto, index) in userStore.purchases"
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
            <td>
              <p class="crossSize" @click="userStore.deleteProduct(index)">
                <font-awesome-icon icon="fa-solid fa-square-xmark" />
              </p>
            </td>
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
  <div class="flex flex-col items-center" v-if="userStore.purchases == 0">
    <h2 class="mb-4 text-2xl font-medium">No hay Productos en el Carrito</h2>
    <router-link to="/"
      ><button  class="buttonStyle">Volver al Home</button></router-link
    >
  </div>
  <div class="flex flex-col items-center" v-if="userStore.purchases.length > 0">
    <h2 class="mb-4 text-2xl font-medium">Finalizar Compra</h2>
    <router-link to="/checkout"
      ><button  class="buttonStyle">Ir a Checkout</button></router-link
    >
  </div>

</template>

<script setup>
import { onMounted } from "vue";
import { userUserStore } from "../stores/userStore";
const userStore = userUserStore();
onMounted(() => userStore.getLocalStorage());

const calculoTotal = () => {
  return userStore.purchases.reduce((suma, item) => {
    return suma + item.bought * item.price;
  }, 0);
};

const calculoCantidad = () => {
  return userStore.purchases.reduce((suma, item) => {
    return suma + item.bought;
  }, 0);
};
</script>

<style scoped>
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

.crossSize {
  display: flex;
  justify-content: center;
  font-size: 50px;
  margin: 5px;
}

.cartImage {
  width: 150px;
}

.deleteStyle {
  padding-right: 0px;
  text-align: center;
}

.buttonStyle {
  width: 300px;
  background-color: #4187f6;
  padding: 5px 0px 5px 0px;
  border-radius: 15px;
  color: white;
}

.buttonStyle:hover {
  background-color: black;
  color: yellow;
}
</style>
