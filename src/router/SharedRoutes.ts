import Indicadores from '@indicadores/views/Indicadores.vue'
import RoadMap from '@roadMap/views/RoadMap.vue'
import Agenda from '@agenda/views/Agenda.vue'
import Tutoriales from '@tutoriales/views/Tutoriales.vue'
import Soporte from '@soporte/views/Soporte.vue'
import Perfil from '@perfil/views/Perfil.vue'
import ListaDePendientes from '@listaDePendientes/views/ListaDePendientes.vue'
import PortafolioDeProyectos from '@portafolioDeProyectos/views/PortafolioDeProyectos.vue'
import EscalaTuNegocio from '@escalaTuNegocio/views/EscalaTuNegocio.vue'

import Exportar from '@exportar/views/Exportar.vue'

const routes = [
    {
        path: '/exportar',
        name: 'Exportar',
        component: Exportar
    },
    {
        path: '/pendientes',
        name: 'Lista de Pendientes',
        component: ListaDePendientes
    },
    {
        path: '/indicadores',
        name: 'Indicadores',
        component: Indicadores
    },
    {
        path: '/portafolio-de-proyectos',
        name: 'Portafolio de Proyectos',
        component: PortafolioDeProyectos
    },
    {
        path: '/roadmap',
        name: 'RoadMap',
        component: RoadMap
    },
    {
        path: '/agenda',
        name: 'Agenda',
        component: Agenda
    },
    {
        path: '/tutoriales',
        name: 'Tutoriales',
        component: Tutoriales
    },
    {
        path: '/soporte',
        name: 'Soporte',
        component: Soporte
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    },
    {
        path: '/escala-tu-negocio',
        name: 'Escala tu Negocio',
        component: EscalaTuNegocio
    }
]

export default routes
