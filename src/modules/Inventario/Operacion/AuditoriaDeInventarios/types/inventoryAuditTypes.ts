export type InventoryAuditSummaryItemType = {
    titulo: string
    cantidad: string | number
}

export type InventoryAuditSummaryItemTranslatedType = {
    title: string
    quantity: string | number
}

export type InventoryAuditRecordsType = {
    id?: number
    fecha: string
    auditorId: number
    auditorNombre: string
    notaGeneral: string
    calificacion: number
    productosAuditados: number
}

export type InventoryAuditRecordsTranslatedType = {
    id?: number
    date: string
    auditorId: number
    auditorName: string
    generalNote: string
    calification: number
    auditedProducts: number
}

export type InventoryAuditRecordPayload = {
    id?: number
    fecha: string
    auditorId: number
    nota: string
}

export type InventoryAuditorsType = {
    id: number
    nombre: string
}

export type InventoryAuditorsTransalatedType = {
    id: number
    name: string
}
