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
    }
]

export default routes