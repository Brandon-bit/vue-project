const routes = [
    // Configuracion de Inventarios
    {
        path: '/inventario/configuracion/productos',
        name: 'Productos',
        component: () => import('@inventario/ConfiguracionDeInventario/views/Productos.vue')
    },
    {
        path: '/inventario/configuracion/crear-producto',
        name: 'CrearProductos',
        component: () => import('@inventario/ConfiguracionDeInventario/views/CrearProducto.vue')
    },
    {
        path: '/inventario/configuracion/productos-expirados',
        name: 'ProductosExpirados',
        component: () => import('@inventario/ConfiguracionDeInventario/views/ProductosExpirados.vue')
    },
    {
        path: '/inventario/configuracion/stock-bajo',
        name: 'StockBajo',
        component: () => import('@inventario/ConfiguracionDeInventario/views/StockBajo.vue')
    },
    {
        path: '/inventario/configuracion/categoria',
        name: 'Categoría',
        component: () => import('@inventario/ConfiguracionDeInventario/views/Categoria.vue')
    },
    {
        path: '/inventario/configuracion/sub-categoría',
        name: 'Subcategoría',
        component: () => import('@inventario/ConfiguracionDeInventario/views/SubCategoria.vue')
    },
    {
        path: '/inventario/configuracion/marcas',
        name: 'Marcas',
        component: () => import('@inventario/ConfiguracionDeInventario/views/Marcas.vue')
    },
    {
        path: '/inventario/configuracion/unidades',
        name: 'Unidades',
        component: () => import('@inventario/ConfiguracionDeInventario/views/Unidades.vue')
    },
    {
        path: '/inventario/configuracion/atributos-variantes',
        name: 'AtributosVariantes',
        component: () => import('@inventario/ConfiguracionDeInventario/views/AtributosVariantes.vue')
    },
    {
        path: '/inventario/configuracion/garantias',
        name: 'Garantias',
        component: () => import('@inventario/ConfiguracionDeInventario/views/Garantias.vue')
    },
    {
        path: '/inventario/configuracion/imprimir-codigo-de-barras',
        name: 'ImprimirCodígoDeBarras',
        component: () => import('@inventario/ConfiguracionDeInventario/views/ImprimirCodigoDeBarras.vue')
    },
    {
        path: '/inventario/configuracion/imprimir-codigo-qr',
        name: 'ImprimirCodigoQR',
        component: () => import('@inventario/ConfiguracionDeInventario/views/ImprimirCodigoQR.vue')
    },
    {
        path: '/inventario/configuracion/manejo-de-descuentos',
        name: 'ManejoDeDescuentos',
        component: () => import('@inventario/ConfiguracionDeInventario/views/ManejoDeDescuentos.vue')
    },

    // Operacion
    {
        path: '/inventario/operacion/puntos-de-reorden',
        name: 'PuntosDeReorden',
        component: () => import('@inventario/Operacion/views/PuntosDeReorden.vue')
    },
    {
        path: '/inventario/operacion/auditoria-de-inventarios',
        name: 'AuditoriaDeInventarios',
        component: () => import('@inventario/Operacion/views/AuditoriaDeInventarios.vue')
    },
    {
        path: '/inventario/operacion/gestion-de-pedidos',
        name: 'GestiónDePedidos',
        component: () => import('@inventario/Operacion/views/GestionDePedidos.vue')
    },
    {
        path: '/inventario/operacion/controles-de-autorizacion-de-pedidos',
        name: 'ControlesDeAutorizaciónDePedidos',
        component: () => import('@inventario/Operacion/views/ControlesDeAutorizacionDePedidos.vue')
    },
    {
        path: '/inventario/operacion/generacion-de-polizas-de-inventario',
        name: 'GeneraciónDePolizasDeInventario',
        component: () => import('@inventario/Operacion/views/GeneracionDePolizasDeInventario.vue')
    },
    {
        path: '/inventario/operacion/entradas-de-inventario',
        name: 'EntradasDeInventario',
        component: () => import('@inventario/Operacion/views/EntradasDeInventario.vue')
    },
    {
        path: '/inventario/operacion/salidas-de-inventario',
        name: 'SalidasDeInventario',
        component: () => import('@inventario/Operacion/views/SalidasDeInventario.vue')
    },

    // Stock
    {
        path: '/inventario/stock/administrar-stock',
        name: 'AdministrarStock',
        component: () => import('@inventario/Stock/views/AdministrarStock.vue')
    },
    {
        path: '/inventario/stock/ajuste-de-stock',
        name: 'AjusteDeStock',
        component: () => import('@inventario/Stock/views/AjusteDeStock.vue')
    },
    {
        path: '/inventario/stock/transferir-stock',
        name: 'TransferirStock',
        component: () => import('@inventario/Stock/views/TransferirStock.vue')
    }
]

export default routes