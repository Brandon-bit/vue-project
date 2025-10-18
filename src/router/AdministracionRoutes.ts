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
    }
]

export default routes
