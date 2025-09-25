const routes = [
    // Configuracion de Inventarios
    {
        path: '/inventario/configuracion/productos',
        name: 'Productos',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/Productos/views/ProductsView.vue')
    },
    {
        path: '/inventario/configuracion/crear-producto',
        name: 'CrearProducto',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/CrearProducto/views/CrearProducto.vue')
    },
    {
        path: '/inventario/configuracion/editar-producto',
        name: 'EditarProducto',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/CrearProducto/views/CrearProducto.vue')
    },
    // {
    //     path: '/inventario/configuracion/detalle-producto/:id',
    //     name: 'DetalleProducto',
    //     component: () =>
    //         import('@inventario/ConfiguracionDeInventario/Producto/views/DetalleProducto.vue')
    // },
    {
        path: '/inventario/configuracion/productos-expiracion',
        name: 'ProductosExpirados',
        component: () =>
            import(
                '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/views/ProductsWithExpirationView.vue'
            )
    },
    {
        path: '/inventario/configuracion/categoria',
        name: 'Categoría',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/Categorias/views/CategoryView.vue')
    },

    {
        path: '/inventario/configuracion/SubCategoria',
        name: 'Subcategoría',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/SubCategoria/views/SubCategoria.vue')
    },
    // {
    //     path: '/inventario/configuracion/sub-categoría',
    //     name: 'Subcategoría',
    //     component: () => import('@inventario/ConfiguracionDeInventario/views/SubCategoria.vue')
    // },
    {
        path: '/inventario/configuracion/marcas',
        name: 'Marcas',
        component: () => import('@inventario/ConfiguracionDeInventario/Marcas/views/BrandsView.vue')
    },
    {
        path: '/inventario/configuracion/unidades',
        name: 'Unidades',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/Unidades/views/UnitsView.vue')
    },
    {
        path: '/inventario/configuracion/atributos-variantes',
        name: 'AtributosVariantes',
        component: () =>
            import(
                '@inventario/ConfiguracionDeInventario/AtributosVariantes/views/VariantAttributesView.vue'
            )
    },
    {
        path: '/inventario/configuracion/garantias',
        name: 'Garantias',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/Garantias/views/WarrantyView.vue')
    },
    {
        path: '/inventario/configuracion/imprimir-codigo-de-barras',
        name: 'ImprimirCodigoDeBarras',
        component: () =>
            import(
                '@inventario/ConfiguracionDeInventario/ImprimirCodigoDeBarras/views/ImprimirCodigoDeBarras.vue'
            )
    },
    {
        path: '/inventario/configuracion/imprimir-codigo-qr',
        name: 'ImprimirCodigoQR',
        component: () =>
            import(
                '@inventario/ConfiguracionDeInventario/ImprimirCodigoQR/views/ImprimirCodigoQR.vue'
            )
    },
    {
        path: '/inventario/configuracion/manejo-de-descuentos',
        name: 'ManejoDeDescuentos',
        component: () =>
            import(
                '@inventario/ConfiguracionDeInventario/ManejoDeDescuentos/views/ManejoDeDescuentos.vue'
            )
    },

    // Operacion
    // {
    //     path: '/inventario/operacion/tablero',
    //     name: 'Tablero',
    //     component: () => import('@inventario/Operacion/Tablero/views/ControlPanelView.vue')
    // },
    // {
    //     path: '/inventario/operacion/puntos-maximos-minimos',
    //     name: 'PuntosDeReorden',
    //     component: () =>
    //         import('@inventario/Operacion/PuntosMaximosMinimos/views/MaxMinPointsView.vue')
    // },
    // {
    //     path: '/inventario/operacion/auditoria-de-inventarios',
    //     name: 'Auditoría de Inventarios',
    //     component: () =>
    //         import('@inventario/Operacion/AuditoriaDeInventarios/views/InventoryAuditView.vue')
    // },
    // {
    //     path: '/inventario/operacion/gestion-de-pedidos',
    //     name: 'Gestión de pedidos',
    //     component: () => import('@inventario/Operacion/GestionDePedidos/views/OrderManagementView.vue')
    // },
    // {
    //     path: '/inventario/operacion/autorizaciones-de-pedidos',
    //      name: 'Autorizaciones de pedidos',
    //      component: () => import('@inventario/Operacion/AutorizacionesDePedidos/views/OrderAuthorizationsView.vue')
    // },
    // {
    //     path: '/inventario/operacion/generacion-de-polizas-de-inventario',
    //     name: 'GeneraciónDePolizasDeInventario',
    //     component: () => import('@inventario/Operacion/views/GeneracionDePolizasDeInventario.vue')
    // },
    // {
    //     path: '/inventario/operacion/entradas-de-inventario',
    //     name: 'EntradasDeInventario',
    //     component: () => import('@inventario/Operacion/views/EntradasDeInventario.vue')
    // },
    // {
    //     path: '/inventario/operacion/salidas-de-inventario',
    //     name: 'SalidasDeInventario',
    //     component: () => import('@inventario/Operacion/views/SalidasDeInventario.vue')
    // },

    // Stock
    {
        path: '/inventario/stock/stock-bajo',
        name: 'StockBajo',
        component: () =>
            import('@inventario/Stock/StockBajo/views/LowStockView.vue')
    },
    // {
    //     path: '/inventario/stock/administrar-stock',
    //     name: 'AdministrarStock',
    //     component: () => import('@inventario/Stock/views/AdministrarStock.vue')
    // },
    // {
    //     path: '/inventario/stock/ajuste-de-stock',
    //     name: 'AjusteDeStock',
    //     component: () => import('@inventario/Stock/views/AjusteDeStock.vue')
    // },
    // {
    //     path: '/inventario/stock/transferir-stock',
    //     name: 'TransferirStock',
    //     component: () => import('@inventario/Stock/views/TransferirStock.vue')
    // }
]

export default routes
