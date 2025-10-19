import type { RouteRecordRaw } from 'vue-router'

const PlaneacionEstrategicaRoutes: RouteRecordRaw[] = [
    {
        path: '/planeacion-estrategica/diagnostico-estrategico',
        name: 'DiagnosticoEstrategico',
        component: () => import('@/modules/PlaneacionEstrategica/DiagnosticoEstrategico/views/DiagnosticoEstrategicoView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Diagnóstico Estratégico'
        }
    },
    {
        path: '/planeacion-estrategica/definicion-de-estrategia',
        name: 'DefinicionDeEstrategia',
        component: () => import('@/modules/PlaneacionEstrategica/DefinicionDeEstrategia/views/DefinicionDeEstrategiaView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Definición de Estrategia'
        }
    },
    {
        path: '/planeacion-estrategica/mapa-estrategico',
        name: 'MapaEstrategico',
        component: () => import('@/modules/PlaneacionEstrategica/MapaEstrategico/views/MapaEstrategicoView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Mapa Estratégico'
        }
    },
    {
        path: '/planeacion-estrategica/gestion-de-iniciativas',
        name: 'GestionDeIniciativas',
        component: () => import('@/modules/PlaneacionEstrategica/GestionDeIniciativas/views/GestionDeIniciativasView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Gestión de Iniciativas'
        }
    },
    {
        path: '/planeacion-estrategica/indicadores-estrategicos',
        name: 'IndicadoresEstrategicos',
        component: () => import('@/modules/PlaneacionEstrategica/IndicadoresEstrategicos/views/IndicadoresEstrategicosView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Indicadores Estratégicos'
        }
    }
]

export default PlaneacionEstrategicaRoutes
