import Exportar from '@exportar/views/ExportarView.vue'
import ListaPendientes from '@listaPendientes/views/ListaPendientesView.vue'
import Indicadores from '@indicadores/views/IndicadoresView.vue'
import PortafolioProyectos from '@portafolioProyectos/views/PortafolioProyectosView.vue'
import RoadMap from '@roadMap/views/RoadMapView.vue'
import Agenda from '@agenda/views/AgendaView.vue'
import Tutoriales from '@tutoriales/views/TutorialesView.vue'
import Soporte from '@soporte/views/SoporteView.vue'
import Perfil from '@perfil/views/PerfilView.vue'
import EscalaNegocio from '@escalaNegocio/views/EscalaNegocioView.vue'

const routes = [
    {
        path: '/exportar',
        name: 'Exportar',
        component: Exportar
    },
    {
        path: '/pendientes',
        name: 'Lista de Pendientes',
        component: ListaPendientes
    },
    {
        path: '/indicadores',
        name: 'Indicadores',
        component: Indicadores
    },
    {
        path: '/portafolio-de-proyectos',
        name: 'Portafolio de Proyectos',
        component: PortafolioProyectos
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
        component: EscalaNegocio
    }
]

export default routes
