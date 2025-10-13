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
            import('@inventario/ConfiguracionDeInventario/CrearProducto/views/CreateProductView.vue')
    },
    {
        path: '/inventario/configuracion/editar-producto',
        name: 'EditarProducto',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/CrearProducto/views/CreateProductView.vue')
    },
    {
        path: '/inventario/configuracion/producto/:id',
        name: 'DetalleProducto',
        component: () =>
            import('@inventario/ConfiguracionDeInventario/Productos/views/DetailView.vue')
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
            import('@inventario/ConfiguracionDeInventario/SubCategoria/views/SubCategoryView.vue')
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
    {
        path: '/inventario/operacion/tablero',
        name: 'Tablero',
        component: () => import('@inventario/Operacion/Tablero/views/ControlPanelView.vue')
    },
    {
        path: '/inventario/operacion/puntos-maximos-minimos',
        name: 'PuntosDeReorden',
        component: () =>
            import('@inventario/Operacion/PuntosMaximosMinimos/views/MaxMinPointsView.vue')
    },
    {
        path: '/inventario/operacion/auditorias-de-inventario',
        name: 'Auditorías de inventario',
        component: () =>
            import('@inventario/Operacion/AuditoriaDeInventarios/views/InventoryAuditView.vue')
    },
    {
        path: '/inventario/operacion/crear-auditoria-de-inventario',
        name: 'Crear auditoria de inventario',
        component: () =>
            import(
                '@inventario/Operacion/AuditoriaDeInventarios/views/CreateUpdateInventoryAuditView.vue'
            )
    },
    {
        path: '/inventario/operacion/actualizar-auditoria-de-inventario/:id',
        name: 'Actualizar auditoria de inventario',
        component: () =>
            import(
                '@inventario/Operacion/AuditoriaDeInventarios/views/CreateUpdateInventoryAuditView.vue'
            )
    },
    {
        path: '/inventario/operacion/gestion-de-pedidos',
        name: 'Gestión de pedidos',
        component: () =>
            import('@inventario/Operacion/GestionDePedidos/views/OrderManagementView.vue')
    },
    {
        path: '/inventario/operacion/autorizaciones-de-pedidos',
        name: 'Autorizaciones de pedidos',
        component: () =>
            import(
                '@inventario/Operacion/AutorizacionesDePedidos/views/OrderAuthorizationsView.vue'
            )
    },
    // {
    //     path: '/inventario/operacion/generacion-de-polizas-de-inventario',
    //     name: 'GeneraciónDePolizasDeInventario',
    //     component: () => import('@inventario/Operacion/views/GeneracionDePolizasDeInventario.vue')
    // },
    {
        path: '/inventario/operacion/entradas-de-inventario',
        name: 'Entradas de inventario',
        component: () =>
            import('@inventario/Operacion/EntradasDeInventario/views/InventoryEntriesView.vue')
    },
    {
        path: '/inventario/operacion/crear-entrada-de-inventario',
        name: 'Crear entrada de inventario',
        component: () =>
            import(
                '@inventario/Operacion/EntradasDeInventario/views/CreateUpdateInventoryEntryView.vue'
            )
    },
    {
        path: '/inventario/operacion/actualizar-entrada-de-inventario/:id',
        name: 'Editar entrada de inventario',
        component: () =>
            import(
                '@inventario/Operacion/EntradasDeInventario/views/CreateUpdateInventoryEntryView.vue'
            )
    },
    {
        path: '/inventario/operacion/salidas-de-inventario',
        name: 'Salidas de inventario',
        component: () =>
            import('@inventario/Operacion/SalidasDeInventario/views/InventoryWithdrawalsVue.vue')
    },
    {
        path: '/inventario/operacion/crear-salida-de-inventario',
        name: 'Crear salida de inventario',
        component: () =>
            import(
                '@inventario/Operacion/SalidasDeInventario/views/CreateUpdateInventoryWithdrawalsView.vue'
            )
    },
    {
        path: '/inventario/operacion/actualizar-salida-de-inventario/:id',
        name: 'Editar salida de inventario',
        component: () =>
            import(
                '@inventario/Operacion/SalidasDeInventario/views/CreateUpdateInventoryWithdrawalsView.vue'
            )
    },
    // {
    //     path: '/inventario/operacion/salidas-de-inventario',
    //     name: 'SalidasDeInventario',
    //     component: () => import('@inventario/Operacion/views/SalidasDeInventario.vue')
    // },

    // Stock
    {
        path: '/inventario/stock/stock-bajo',
        name: 'StockBajo',
        component: () => import('@inventario/Stock/StockBajo/views/LowStockView.vue')
    },
    {
        path: '/inventario/stock/administrar-stock',
        name: 'AdministrarStock',
        component: () => import('@inventario/Stock/AdministrarStock/views/AdminStockView.vue')
    }
    // {
    //     path: '/inventario/stock/ajuste-de-stock',
    //     name: 'AjusteDeStock',
    //     component: () => import('@inventario/Stock/views/AjusteDeStock.vue')
    // },
     {
         path: '/inventario/stock/transferir-stock',
         name: 'TransferirStock',
         component: () => import('@inventario/Stock/TransferenciaStock/views/transferStock.vue')
     },

                    {
                path: '/traslados/crear',
                name: 'Crear Traslado', 
                component: () => import('@inventario/Stock/TransferenciaStock/views/CreateTransferView.vue')
                },
                {
                path: '/traslados/editar/:id',
                name: 'Editar Traslado', 
                component: () => import('@inventario/Stock/TransferenciaStock/views/CreateTransferView.vue')
                }
]

export default routes
