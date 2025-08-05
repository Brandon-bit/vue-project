import General from '@proyectos/Configuracion/views/General.vue'
import Plantillas from '@proyectos/Configuracion/views/Plantillas.vue'

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
