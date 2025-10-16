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
    }
]

export default routes
