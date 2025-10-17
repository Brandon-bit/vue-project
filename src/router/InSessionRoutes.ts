import Dashboard from '@core/InSessionLayout/views/Dashboard.vue'
import DashboardAdministracion from '@/core/InSessionLayout/views/DashboardAdministracion.vue'
import DashboardAdministracionDeLaInformacion from '@/core/InSessionLayout/views/DashboardAdministracionDeLaInformacion.vue'
import DashboardComercial from '@/core/InSessionLayout/views/DashboardComercial.vue'
import DashboardMantenimiento from '@/core/InSessionLayout/views/DashboardMantenimiento.vue'
import DashboardMarketing from '@/core/InSessionLayout/views/DashboardMarketing.vue'
import DashboardProcesos from '@/core/InSessionLayout/views/DashboardProcesos.vue'
import DashboardProyectos from '@/core/InSessionLayout/views/DashboardProyectos.vue'
import DashboardRecursosHumanos from '@/core/InSessionLayout/views/DashboardRecursosHumanos.vue'

const routes = [
    {
        path: '',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/dashboard/proyectos',
        name: 'Dashboard - Proyectos',
        component: DashboardProyectos
    },
    {
        path: '/dashboard/procesos',
        name: 'Dashboard - Procesos',
        component: DashboardProcesos
    },
    {
        path: '/dashboard/recursos-humanos',
        name: 'Dashboard - Recursos Humanos',
        component: DashboardRecursosHumanos
    },
    {
        path: '/dashboard/marketing',
        name: 'Dashboard - Marketing',
        component: DashboardMarketing
    },
    {
        path: '/dashboard/comercial',
        name: 'Dashboard - Comercial',
        component: DashboardComercial
    },
    {
        path: '/dashboard/administracion',
        name: 'Dashboard - Administración',
        component: DashboardAdministracion
    },
    {
        path: '/dashboard/administracion-de-la-informacion',
        name: 'Dashboard - Administración de la Información',
        component: DashboardAdministracionDeLaInformacion
    },
    {
        path: '/dashboard/mantenimiento',
        name: 'Dashboard - Mantenimiento',
        component: DashboardMantenimiento
    }
]

export default routes
