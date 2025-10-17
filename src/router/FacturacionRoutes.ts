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
    },
    {
        path: '/facturacion/generacion-de-cfdi',
        name: 'GeneracionDeCFDI',
        component: () =>
            import('@facturacion/GeneracionDeCFDI/views/CFDIView.vue')
    },
    {
        path: '/facturacion/matriz-de-facturas',
        name: 'MatrizDeFacturas',
        component: () =>
            import('@facturacion/MatrizDeFacturas/views/MatrizView.vue')
    }
]

export default routes
