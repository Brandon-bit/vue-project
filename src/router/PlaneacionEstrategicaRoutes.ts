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
    }
]

export default PlaneacionEstrategicaRoutes
