const routes = [
    {
        path: '/nomina',
        name: 'DashboardNomina',
        component: () =>
            import('@/modules/Nomina/Dashboard/views/PayrollDashboardView.vue')
    },
    {
        path: '/nomina/conceptos-nomina',
        name: 'Conceptos Nomina',
        component: () =>
            import('@/modules/Nomina/ConceptosNomina/views/PayrollConceptsListView.vue')
    },
    {
        path: '/nomina/periodos-nomina',
        name: 'Periodos Nomina',
        component: () => import('@/modules/Nomina/PeriodosNomina/views/PayrollPeriodsListView.vue')
    },
    {
        path: '/nomina/detalle-nomina/:id',
        name: 'Detalle Nomina Detail',
        component: () => import('@/modules/Nomina/DetalleNomina/views/PayrollDetailView.vue')
    }
]

export default routes
