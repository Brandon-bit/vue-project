const routes = [
    {
        path: '/contabilidad/activos',
        name: 'Activos',
        component: () =>
            import('@contabilidad/ActivosFijos/views/FixedAssetsView.vue')
    }
]

export default routes