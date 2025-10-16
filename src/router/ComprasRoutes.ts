const routes = [
    {
        path: '/compras/catalogo-de-productos',
        name: 'CatalogoDeProductos',
        component: () =>
            import('@compras/CatalogoDeProductos/views/ProductCatalogView.vue')
    }
]

export default routes
