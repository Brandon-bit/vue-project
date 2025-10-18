const routes = [
    {
        path: '/administracion/caja-chica',
        name: 'CajaChica',
        component: () =>
            import('@administracion/CajaChica/views/PettyCashView.vue')
    },
    {
        path: '/administracion/presupuestos',
        name: 'Presupuestos',
        component: () =>
            import('@administracion/Presupuestos/views/BudgetView.vue')
    },
    {
        path: '/administracion/gestion-documental',
        name: 'GestionDocumental',
        component: () =>
            import('@administracion/GestionDocumental/views/DocumentView.vue')
    },
    {
        path: '/administracion/viaticos-y-reembolsos',
        name: 'ViaticosYReembolsos',
        component: () =>
            import('@administracion/ViaticosYReembolsos/views/ExpenseView.vue')
    },
    {
        path: '/administracion/contratos-y-convenios',
        name: 'ContratosYConvenios',
        component: () =>
            import('@administracion/ContratosYConvenios/views/ContractView.vue')
    }
]

export default routes
