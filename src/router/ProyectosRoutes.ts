import General from '@proyectos/Configuracion/pages/General.vue'
import Plantillas from '@proyectos/Configuracion/pages/Plantillas.vue'

const routes = [
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
