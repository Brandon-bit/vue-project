import Exportar from "../shared/pages/Exportar.vue"
import ListaDePendientes from "../shared/pages/ListaDePendientes.vue"
import Indicadores from "../shared/pages/Indicadores.vue"
import PortafolioDeProyectos from "../shared/pages/PortafolioDeProyectos.vue"
import RoadMap from "../shared/pages/RoadMap.vue"
import Agenda from "../shared/pages/Agenda.vue"
import Tutoriales from "../shared/pages/Tutoriales.vue"
import Soporte from "../shared/pages/Soporte.vue"
import Perfil from "../shared/pages/Perfil.vue"
import EscalaTuNegocio from "../shared/pages/EscalaTuNegocio.vue"

const routes = [
    {
        path: "/exportar",
        name: "Exportar",
        component: Exportar
    },
    {
        path: "/pendientes",
        name: "Lista de Pendientes",
        component: ListaDePendientes
    },
    {
        path: "/indicadores",
        name: "Indicadores",
        component: Indicadores
    },
    {
        path: "/portafolio-de-proyectos",
        name: "Portafolio de Proyectos",
        component: PortafolioDeProyectos
    },
    {
        path: "/roadmap",
        name: "RoadMap",
        component: RoadMap
    },
    {
        path: "/agenda",
        name: "Agenda",
        component: Agenda
    },
    {
        path: "/tutoriales",
        name: "Tutoriales",
        component: Tutoriales
    },
    {
        path: "/soporte",
        name: "Soporte",
        component: Soporte
    },
    {
        path: "/perfil",
        name: "Perfil",
        component: Perfil
    },
    {
        path: "/escala-tu-negocio",
        name: "Escala tu Negocio",
        component: EscalaTuNegocio
    }
]

export default routes