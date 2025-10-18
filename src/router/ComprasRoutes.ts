const routes = [
    {
        path: '/compras',
        name: 'Compras',
        component: () =>
            import('@compras/Dashboard/views/PurchasingDashboardView.vue')
    },
    {
        path: '/compras/catalogo-de-productos',
        name: 'CatalogoDeProductos',
        component: () =>
            import('@compras/CatalogoDeProductos/views/ProductCatalogView.vue')
    },
    {
        path: '/compras/evaluacion-de-proveedores',
        name: 'EvaluacionDeProveedores',
        component: () =>
            import('@compras/EvaluacionDeProveedores/views/SupplierEvaluationView.vue')
    },
    {
        path: '/compras/ordenes-de-compra',
        name: 'OrdenesDeCompra',
        component: () =>
            import('@compras/OrdenesDeCompra/views/PurchaseOrderView.vue')
    },
    {
        path: '/compras/presupuestos',
        name: 'Presupuestos',
        component: () =>
            import('@compras/Presupuestos/views/BudgetView.vue')
    },
    {
        path: '/compras/proveedores',
        name: 'Proveedores',
        component: () =>
            import('@compras/Proveedores/views/SupplierView.vue')
    },
    {
        path: '/compras/solicitudes-de-compra',
        name: 'SolicitudesDeCompra',
        component: () =>
            import('@compras/SolicitudesDeCompra/views/PurchaseRequestView.vue')
    }
]

export default routes
