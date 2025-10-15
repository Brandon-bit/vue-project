const routes = [
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
    }
]

export default routes