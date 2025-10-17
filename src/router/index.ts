import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
// Layouts
import InSessionLayout from '@core/InSessionLayout/views/InSessionLayout.vue'
import OutSessionLayout from '@core/OutSessionLayout/views/OutSessionLayout.vue'
// InSession Routes
import InSessionRoutes from './InSessionRoutes'
import Login from '@core/OutSessionLayout/views/Login.vue'
// NavBar Routes
import NavBarRoutes from './NavBarRoutes'
// Default Routes
import DefaultRoutes from './DefaultModuleRoutes'
// Proyectos Routes
import ProyectosRoutes from './ProyectosRoutes'
// Inventario Routes
import InventarioRoutes from './InventarioRoutes'

// Marketing Routes
import MarketingRoutes from './MarketingRoutes'

// POS Routes
import PosRoutes from './POSRoutes'
// Contabilidad Routes
import ContabilidadRoutes from './ContabilidadRoutes'
// Compras Routes
import ComprasRoutes from './ComprasRoutes'
import SalesRoute from './SalesRoute'
import FacturacionRoutes from './FacturacionRoutes'

import RRHHRoutes from './RRHHRoutes'

import NominaRoutes from './NominaRoutes'

const routes = [
    {
        path: '/',
        component: InSessionLayout,
        meta: { requiresAuth: true },
        children: [
            ...InSessionRoutes,
            ...DefaultRoutes,
            ...NavBarRoutes,
            ...ProyectosRoutes,
            ...InventarioRoutes,
            ...ContabilidadRoutes,
            ...MarketingRoutes,
            ...ComprasRoutes,
            ...FacturacionRoutes,
            //...SalesRoute,
            ...PosRoutes,
            ...RRHHRoutes,
            ...NominaRoutes
        ]
    },
    {
        path: '/login',
        component: OutSessionLayout,
        meta: { requiresGuest: true },
        children: [{ path: '', name: 'login', component: Login }]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/shared/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // Evitar múltiples verificaciones si ya está cargando
    if (authStore.isLoading) {
        await authStore.checkAuth()
    }

    const isLoggedIn = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isLoggedIn) {
        // Redirige al login y pasa la ruta original como query
        return next({ path: '/login', query: { redirect: to.fullPath } })
    }

    if (to.meta.requiresGuest && isLoggedIn) {
        // Si el usuario ya está logueado y entra al login, redirígelo al dashboard
        return next('/')
    }

    next()
})

export default router
