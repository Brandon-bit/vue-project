import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import InSessionLayout from '@core/InSessionLayout/views/InSessionLayout.vue'
import OutSessionLayout from '@core/OutSessionLayout/views/OutSessionLayout.vue'
import InSessionRoutes from './InSessionRoutes'
import Login from '@core/OutSessionLayout/views/Login.vue'
import NavBarRoutes from './NavBarRoutes'
import DefaultRoutes from './DefaultModuleRoutes'
import ProyectosRoutes from './ProyectosRoutes'
import InventarioRoutes from './InventarioRoutes'
import MarketingRoutes from './MarketingRoutes'
import PosRoutes from './POSRoutes'
import ContabilidadRoutes from './ContabilidadRoutes'
import ComprasRoutes from './ComprasRoutes'
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
