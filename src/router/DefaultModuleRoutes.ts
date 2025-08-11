// Usuarios
import ListaUsuarios from "@defaultModule/Usuarios/views/ListaUsuarios.vue"
import NuevoUsuario from "@defaultModule/Usuarios/views/NuevoUsuario.vue"
// Configuracion
import DiasInhabiles from "@defaultModule/Configuracion/views/DiasInhabiles.vue"

const routes = [
    // Usuario
    {
        path: '/usuario',
        name: 'Usuario',
        component: ListaUsuarios
    },
    {
        path: '/usuario/nuevo',
        name: 'Nuevo Usuario',
        component: NuevoUsuario
    },
    // Configuracion
    {
        path: '/dias-inhabiles',
        name: 'Días Inhabiles',
        component: DiasInhabiles
    }
]

export default routes