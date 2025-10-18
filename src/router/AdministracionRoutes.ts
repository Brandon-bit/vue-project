const routes = [
    {
        path: '/administracion/caja-chica',
        name: 'CajaChica',
        component: () =>
            import('@administracion/CajaChica/views/PettyCashView.vue')
    }
]

export default routes
