const routes = [
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
    }
]

export default routes
