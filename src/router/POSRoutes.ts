const routes = [
    {
        path: '/pos/punto-de-venta',
        name: 'Punto de Venta',
        component: () => import('@pos/PuntoDeVenta/views/PointOfSaleView.vue')
    }
]

export default routes
