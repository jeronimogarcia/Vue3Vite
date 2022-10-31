<template>
  <div class="navigation" v-if="!userStore.loadingSession">
    <ul>
      <li
        class="list"
        :class="{ active: navbar.actualPath === 'home' }"
        v-if="userStore.userData"
      >
        <router-link to="/">
          <span class="icon">
            <font-awesome-icon icon="fa-solid fa-house" class="icon-icon" />
          </span>
          <span class="title">Home</span>
        </router-link>
      </li>
      <li
        class="list"
        :class="{ active: navbar.actualPath === 'login' }"
        v-if="!userStore.userData"
      >
        <router-link to="/login">
          <span class="icon"
            ><font-awesome-icon
              icon="fa-solid fa-right-from-bracket"
              class="icon-icon"
          /></span>
          <span class="title">Login</span>
        </router-link>
      </li>
      <li
        class="list"
        :class="{ active: navbar.actualPath === 'register' }"
        v-if="!userStore.userData"
      >
        <router-link to="/register">
          <span class="icon"
            ><font-awesome-icon icon="fa-solid fa-user-plus" class="icon-icon"
          /></span>
          <span class="title">Register</span>
        </router-link>
      </li>

      <li
        class="list"
        :class="{ active: navbar.actualPath === 'carrito' }"
        v-if="userStore.userData"
      >
        <router-link to="/chart"
          ><span class="icon"
            ><font-awesome-icon
              icon="fa-solid fa-cart-shopping"
              class="icon-icon"
          /></span>
          <span class="title">Carrito</span>
        </router-link>
      </li>

      <li
        class="list"
        :class="{ active: navbar.actualPath === 'checkout' }"
        v-if="userStore.userData | userStore.purchases.length != 0"
      >
        <router-link to="/checkout"
          ><span class="icon"
            ><font-awesome-icon icon="fa-solid fa-credit-card" class="icon-icon"/></span>
          <span class="title">Checkout</span>
        </router-link>
      </li>

      <li
        class="list"
        :class="{ active: navbar.actualPath === 'tickets' }"
        v-if="userStore.userData"
      >
        <router-link to="/tickets"
          ><span class="icon"
            ><font-awesome-icon icon="fa-solid fa-clipboard-check" class="icon-icon"/></span>
          <span class="title">Tickets</span>
        </router-link>
      </li>

      <li
        class="list"
        :class="{ active: navbar.actualPath === 'about' }"
        v-if="userStore.userData"
      >
        <router-link to="/about">
          <span class="icon">
            <font-awesome-icon
              icon="fa-solid fa-circle-info"
              class="icon-icon"
            />
          </span>
          <span class="title">About</span>
        </router-link>
      </li>

      <li class="list">
        <button @click="userStore.logoutUser" v-if="userStore.userData">
          <span class="icon"
            ><font-awesome-icon icon="fa-solid fa-power-off" class="icon-icon"
          /></span>
          <span class="title">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { userUserStore } from "../../stores/userStore";
import { useNavbar } from "../../stores/navbar";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const userStore = userUserStore();
const navbar = useNavbar();
const routing = useRoute();

onMounted(() => navbar.getLocalStorage());

watch(
  () => routing.path,
  () => {
    switch (routing.path) {
      case "/":
        navbar.actualPath = "home";
        break;
      case "/login":
        navbar.actualPath = "login";
        break;
      case "/register":
        navbar.actualPath = "register";
        break;
      case "/chart":
        navbar.actualPath = "carrito";
        break;
      case "/checkout":
        navbar.actualPath = "checkout";
        break;
      case "/tickets":
        navbar.actualPath = "tickets";
        break;
      case "/about":
        navbar.actualPath = "about";
        break;
      default:
      navbar.actualPath = "";
    }
    navbar.setLocalStorage();
  }
);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navigation {
  position: fixed;
  left: 0;
  height: 100vh;
  width: 70px;
  background-color: #2b343b;
  box-shadow: 10px 0 0 #4187f6;
  border-left: 10px solid #2b343b;
  overflow-x: hidden;
  transition: width 0.5s;
}

.navigation:hover {
  width: 200px;
}

.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 5px;
  padding-top: 40px;
}

.navigation ul li {
  position: relative;
  list-style: none;
  margin-top: 10px;
  width: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.navigation ul li.active {
  background-color: #4187f6;
}

.navigation ul li.active a::before {
  content: "";
  position: absolute;
  top: -30px;
  right: 0;
  width: 30px;
  height: 30px;
  background: #2b343b;
  border-radius: 50%;
  box-shadow: 15px 15px 0 #4187f6;
}

.navigation ul li.active a::after {
  content: "";
  position: absolute;
  bottom: -30px;
  right: 0;
  width: 30px;
  height: 30px;
  background: #2b343b;
  border-radius: 50%;
  box-shadow: 15px -15px 0 #4187f6;
}

.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: white;
}

.navigation ul li .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 65px;
  text-align: center;
}

.navigation ul li .icon .icon-icon {
  position: relative;
  font-size: 1.5rem;
  z-index: 1;
}

.navigation ul li .title {
  position: relative;
  display: block;
  padding-left: 10px;
  height: 60px;
  line-height: 60px;
  white-space: nowrap;
}

.navigation button {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: white;
}

.navigation button:hover {
  color: rgb(225, 218, 84);
}

.navigation ul li a:hover {
  color: rgb(225, 218, 84);
}
</style>
