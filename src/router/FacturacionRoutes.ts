const routes = [
    {
        path: '/facturacion/generacion-de-complementos',
        name: 'GeneracionDeComplementos',
        component: () =>
            import('@facturacion/GeneracionDeComplementos/views/ComplementView.vue')
    }
]

export default routes
