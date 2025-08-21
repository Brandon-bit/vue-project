import Productos from '@compras/Productos/views/ProductosViews.vue'
//import CrearProductoView from '@compras/Productos/views/CrearProductoView.vue'

const routes = [
    {
        path: '/compras/productos',
        name: 'ProductosCompras',
        component: Productos
    },
    // {
    //     path: '/compras/productos/crear',
    //     name: 'Crear producto',
    //     component: CrearProductoView
    // },
]

export default routes
