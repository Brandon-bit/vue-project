const routes = [
    {
        path: '/contabilidad',
        name: 'Contabilidad',
        component: () =>
            import('@contabilidad/Dashboard/views/AccountingDashboardView.vue')
    },
    {
        path: '/contabilidad/activos',
        name: 'Activos',
        component: () =>
            import('@contabilidad/ActivosFijos/views/FixedAssetsView.vue')
    },
    {
        path: '/contabilidad/catalogo-de-cuentas',
        name: 'CatalogoDeCuentas',
        component: () =>
            import('@contabilidad/CatalogoDeCuentas/views/AccountsCatalogView.vue')
    },
    {
        path: '/contabilidad/libros-de-diario',
        name: 'LibrosDiario',
        component: () =>
            import('@contabilidad/LibrosDeDiario/views/JournalBooksView.vue')
    },
    {
        path: '/contabilidad/polizas-de-diario',
        name: 'PolizasDeDiario',
        component: () =>
            import('@contabilidad/PolizasDeDiario/views/JournalPoliciesView.vue')
    },
    {
        path: '/contabilidad/polizas-de-ingresos',
        name: 'PolizasDeIngresos',
        component: () =>
            import('@contabilidad/PolizasDeIngresos/views/IncomePoliciesView.vue')
    },
    {
        path: '/contabilidad/polizas-de-gastos',
        name: 'PolizasDeGastos',
        component: () =>
            import('@contabilidad/PolizasDeGastos/views/ExpensePoliciesView.vue')
    },
    {
        path: '/contabilidad/depreciacion',
        name: 'Depreciacion',
        component: () =>
            import('@contabilidad/Depreciacion/views/DepreciationView.vue')
    },
    {
        path: '/contabilidad/polizas-contables',
        name: 'PolizasContables',
        component: () =>
            import('@contabilidad/PolizasContables/views/AccountingPoliciesView.vue')
    },
    {
        path: '/contabilidad/operacion-de-movimientos',
        name: 'OperacionDeMovimientos',
        component: () =>
            import('@contabilidad/OperacionDeMovimientos/views/AccountingMovementsView.vue')
    }
]

export default routes