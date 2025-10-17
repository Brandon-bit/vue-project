const routes = [
    {
        path: '/facturacion/generacion-de-complementos',
        name: 'GeneracionDeComplementos',
        component: () =>
            import('@facturacion/GeneracionDeComplementos/views/ComplementView.vue')
    },
    {
        path: '/facturacion/constancias-de-retencion',
        name: 'ConstanciasDeRetencion',
        component: () =>
            import('@facturacion/ConstanciasDeRetencion/views/RetencionView.vue')
    }
]

export default routes
