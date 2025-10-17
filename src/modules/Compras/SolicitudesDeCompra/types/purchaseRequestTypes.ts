export type PurchaseRequestType = {
    id: number
    folio: string
    solicitante: string
    area: string
    fecha: string
    total: number
    estatus: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'En Revisión'
    items: number
    justificacion?: string
    aprobador?: string
    fechaAprobacion?: string
    comentarios?: string
    presupuestoDisponible?: number
}

export type PurchaseRequestItemType = {
    id?: number
    productoId: number
    codigo: string
    nombre: string
    cantidad: number
    precio: number
    subtotal: number
}

export type PurchaseRequestFormType = {
    area: string
    justificacion: string
    items: PurchaseRequestItemType[]
}

export type PurchaseRequestStatsType = {
    total: number
    pendientes: number
    aprobadas: number
    rechazadas: number
}

export type CatalogProductType = {
    id: number
    codigo: string
    nombre: string
    precio: number
    categoria?: string
    disponible?: boolean
}

export type BudgetValidationType = {
    presupuestoDisponible: number
    montoSolicitud: number
    saldoRestante: number
    suficiente: boolean
}

export type PurchaseRequestStatusType = 'Pendiente' | 'Aprobada' | 'Rechazada' | 'En Revisión'
