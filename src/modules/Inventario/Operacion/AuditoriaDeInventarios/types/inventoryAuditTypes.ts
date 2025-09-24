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
    productoId: number
    producto: string
    conteo: number
    diferencia: number
    nota: string
}

export type InventoryAuditRecordsTranslatedType = {
    id?: number
    date: string
    auditorId: number
    auditorName: string
    productId: number
    product: string
    count: number
    difference: number
    note: string
}

export type InventoryAuditRecordPayload = {
    id?: number
    fecha: string
    auditorId: number
    productoId: number
    conteo: number
    diferencia: number
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
