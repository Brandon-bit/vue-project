const routes = [
//dashboard
    {
        path: '/marketing/dashboard',
        name: 'Dashboard',
        component: () =>
            import('@marketing/Dashboard/views/DashboardView.vue')
    },
    {
        path: '/marketing/redes-sociales',
        name: 'Redes Sociales',
        component: () =>
            import('@marketing/CordinadorRedesSociales/views/socialCordinador.vue')
    }
]

export default routes
