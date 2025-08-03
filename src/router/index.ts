import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../shared/pages/Dashboard.vue'
// Proyectos Rutes
import ProyectosRoutes from './ProyectosRoutes'

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  ...ProyectosRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router