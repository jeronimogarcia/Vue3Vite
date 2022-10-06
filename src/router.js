import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Login from "./views/LoginView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: Login },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
