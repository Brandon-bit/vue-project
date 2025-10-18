const routes = [
//dashboard
    {
        path: '/marketing',
        name: 'DashboardMarketing',
        component: () =>
            import('@marketing/Dashboard/views/MarketingDashboardView.vue')
    },
    {
        path: '/marketing/coordinador-de-redes-sociales',
        name: 'Coordinador de Redes Sociales',
        component: () =>
            import('@marketing/CordinadorRedesSociales/views/socialCordinador.vue')
    },
    {
        path: '/marketing/banco-de-imagenes',
        name: 'Banco de Imágenes',
        component: () =>
            import('@marketing/BancoImagenes/views/bancoView.vue')
    },
    {
       path: '/marketing/gestion-de-proyectos',
        name: 'Gestión de Proyectos',
        component: () =>
            import('@marketing/GestionProyectos/views/ProjectView.vue')
    },
    {
       path: '/marketing/gestion-de-marcas',
        name: 'Gestión de Marcas',
        component: () =>
            import('@marketing/GestionMarcas/views/BrandManagment.vue')
    },
    {
       path: '/marketing/benchmarking-y-mystery-shopper',
        name: 'Benchmarking y Mystery Shopper',
        component: () =>
            import('@marketing/Benchmarking/views/BenchmarkingView.vue')
    },
    {
       path: '/marketing/estrategia-de-campanas',
        name: 'Estrategia de Campañas',
        component: () =>
            import('@marketing/EstrategiaCampanas/views/CampaignStrategyView.vue')
    },
    {
       path: '/marketing/e-mailing',
        name: 'E-mailing',
        component: () =>
            import('@marketing/Emailing/views/EmailingView.vue')
    },

]

export default routes
