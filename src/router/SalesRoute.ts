const routes =[

       {
        path: '/ventas/ordenes-en-linea',
        name: 'OnlineOrders',
        component: () =>
            import('@/modules/Sales/Sales/online-orders/views/onlineOrder.vue')
    },
]

export default routes