const routes = [
    {
        path: '/ventas',
        name: 'DashboardVentas',
        component: () =>
            import('@/modules/Ventas/Dashboard/views/SalesDashboardView.vue')
    }
]

export default routes