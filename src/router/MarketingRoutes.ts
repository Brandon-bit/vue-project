const routes = [
//dashboard
    {
        path: '/marketing/dashboard',
        name: 'Dashboard',
        component: () =>
            import('@marketing/Dashboard/views/DashboardView.vue')
    }
]

export default routes
