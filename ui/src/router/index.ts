import LoginView from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import SimulationView from '@/views/SimulationView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: MainView },
    { path: "/simulation", component: SimulationView },
    { path: "/login", component: LoginView },
    { path: "/profile", component: UserView },
  ],
})

export default router
