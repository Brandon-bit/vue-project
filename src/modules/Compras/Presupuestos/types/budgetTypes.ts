export type BudgetType = {
    id: number
    area: string
    proyecto: string
    periodo: string
    asignado: number
    gastado: number
    comprometido: number
    disponible: number
    porcentajeGastado: number
    porcentajeComprometido: number
    porcentajeTotal: number
    excedido: boolean
    fechaCreacion: string
    fechaActualizacion: string
}

export type BudgetFormType = {
    area: string
    proyecto: string
    periodo: string
    asignado: number
}

export type BudgetStatsType = {
    totalAsignado: number
    totalGastado: number
    totalComprometido: number
    totalDisponible: number
    porcentajeEjecutado: number
    porcentajeComprometido: number
    porcentajeDisponible: number
}

export type BudgetStatusType = 'Activo' | 'Excedido' | 'Completado' | 'Suspendido'
