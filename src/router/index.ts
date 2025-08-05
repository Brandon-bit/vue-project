import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/shared/views/Dashboard.vue'
// Shared Routes
import SharedRoutes from './SharedRoutes'
// Proyectos Rutes
import ProyectosRoutes from './ProyectosRoutes'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    ...SharedRoutes,
    ...ProyectosRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
