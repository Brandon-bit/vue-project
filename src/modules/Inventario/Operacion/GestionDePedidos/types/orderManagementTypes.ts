export type OrderManagementRecordsType = {
    id?: number
    folio: string
    idProveedor: number
    proveedor: string
    fecha: string
    estado: string
    estadoId: number
}

export type OrderManagementRecordsTranslatedType = {
    id?: number
    folio: string
    supplierId: number
    supplier: string
    date: string
    state: string
    stateId: number
}

export type InventoryAuditRecordPayload = {
    id?: number
    folio: string
    supplierId: number
}

export type SuppliersType = {
    id: number
    nombre: string
}

export type SuppliersTransalatedType = {
    id: number
    name: string
}
