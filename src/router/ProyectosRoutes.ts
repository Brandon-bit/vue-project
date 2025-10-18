import General from '@proyectos/Configuracion/views/General.vue'
import Plantillas from '@proyectos/Configuracion/views/Plantillas.vue'

const routes = [
    {
        path: '/proyectos',
        name: 'DashboardProyecto',
        component: () =>
            import('@/modules/Proyectos/Dashboard/views/ProjectsDashboardView.vue')
    },
    {
        path: '/proyecto/configuracion',
        name: 'Configuración General',
        component: General
    },
    {
        path: '/proyecto/plantillas',
        name: 'Plantillas',
        component: Plantillas
    }
]

export default routes

