import SimulationView from '@/views/SimulationView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/simulation", component: SimulationView }
  ],
})

export default router
