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
    }
]

export default PlaneacionEstrategicaRoutes
