import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Login from "./views/LoginView.vue";
import Register from "./views/RegisterView.vue";
import ChartView from "./views/ChartView.vue"
import AboutView from './views/AboutView.vue'
import DetailView from './views/DetailView.vue'
import {userUserStore} from './stores/userStore'

const requireAuth = async(to, from, next) => {
  const userStore = userUserStore()
  userStore.loadingSession = true
  const user = await userStore.currentUser()
  if(user){
    next()
  }else{
    next('/login')
  }
  userStore.loadingSession = false
}

const routes = [
  { path: "/", component: HomeView, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/chart", component: ChartView, beforeEnter: requireAuth },
  { path: "/about", component: AboutView },
  { path: "/product/:id", component: DetailView, beforeEnter: requireAuth },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
