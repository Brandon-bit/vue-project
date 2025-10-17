const routes = [
    {
        path: '/rrhh/empresas',
        name: 'Empresas',
        component: () => import('@rrhh/Empresas/views/CompaniesListView.vue')
    },
    {
        path: '/rrhh/empresas/crear',
        name: 'Crear empresa',
        component: () => import('@rrhh/Empresas/views/CreateUpdateCompanyView.vue')
    },
    {
        path: '/rrhh/empresas/editar/:id',
        name: 'Actualizar empresa',
        component: () => import('@rrhh/Empresas/views/CreateUpdateCompanyView.vue')
    },
    {
        path: '/rrhh/empleados',
        name: 'Empleados',
        component: () => import('@/modules/RRHH/Empleados/views/EmployeesListView.vue')
    },
    {
        path: '/rrhh/empleados/crear',
        name: 'Crear empleado',
        component: () => import('@/modules/RRHH/Empleados/views/CreateUpdateEmployeeView.vue')
    },
    {
        path: '/rrhh/empleados/editar/:id',
        name: 'Actualizar empleado',
        component: () => import('@/modules/RRHH/Empleados/views/CreateUpdateEmployeeView.vue')
    },
    {
        path: '/rrhh/vacaciones',
        name: 'Vacaciones',
        component: () => import('@/modules/RRHH/Vacaciones/views/VacationsListView.vue')
    },
    {
        path: '/rrhh/dashboard-de-vacaciones',
        name: 'Dashboard de vacaciones',
        component: () =>
            import('@/modules/RRHH/VacacionesDashboard/views/VacationsDashboardView.vue')
    },
    {
        path: '/rrhh/comunicaciones-organizacionales',
        name: 'Comunicaciones Organizacionales',
        component: () =>
            import('@/modules/RRHH/ComunicacionesOrganizacionales/views/CommunicationsListView.vue')
    },
    {
        path: '/rrhh/comunicaciones-organizacionales/crear',
        name: 'Crear comunicado',
        component: () =>
            import(
                '@/modules/RRHH/ComunicacionesOrganizacionales/views/CreateUpdateCommunicationView.vue'
            )
    },
    {
        path: '/rrhh/comunicaciones-organizacionales/editar/:id',
        name: 'Actualizar comunicado',
        component: () =>
            import(
                '@/modules/RRHH/ComunicacionesOrganizacionales/views/CreateUpdateCommunicationView.vue'
            )
    },
    {
        path: '/rrhh/departamentos',
        name: 'Departamentos',
        component: () => import('@/modules/RRHH/Departamentos/views/DepartmentsListView.vue')
    }
]

export default routes
