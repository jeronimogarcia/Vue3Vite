import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Login from "./views/LoginView.vue";
import Register from "./views/RegisterView.vue";
import {userUserStore} from './stores/userStore'

const requireAuth = async(to, from, next) => {
  const userStore = userUserStore()
  const user = await userStore.currentUser()
  if(user){
    next()
  }else{
    next('/login')
  }
}

const routes = [
  { path: "/", component: HomeView, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
