export type InventoryAuditSummary = {
    titulo: string
    cantidad: string | number
}

export type InventoryAuditSummaryDTO = {
    title: string
    quantity: string | number
}

export type InventoryAudit = {
    id?: number
    fecha: string
    auditorId: number
    auditorNombre: string
    notaGeneral: string
    calificacion: number
    estadoId: number
    estado: string
    productosAuditados: number
    productos?: ProductPayload[]
}

export type InventoryAuditDTO = {
    id?: number
    date: string
    auditorId: number
    auditorName: string
    generalNote: string
    calification: number
    stateId: number
    state: string
    auditedProducts: number
    products?: Product[]
}

export type InventoryAuditor = {
    id: number
    nombre: string
}

export type InventoryAuditorDTO = {
    id: number
    name: string
}

export type InventoryAuditForm = {
    id?: number
    date: string
    auditorId: number
    stateId: number
    generalNote: string
}

export type InventoryAuditRequest = {
    date: string
    auditorId: number
    stateId: number
    generalNote: string
}

export type InventoryAuditRequestPayload = {
    fecha: string
    auditorId: number
    notaGeneral: string
    estadoId: number
    productos?: ProductPayload[]
}

export type Product = {
    id?: number | undefined
    productId: number
    productName: string
    realCount: number
    expectedCount: number
    difference: number
    note: string
}

export type ProductPayload = {
    id?: number | undefined
    productoId: number
    productoNombre: string
    conteoReal: number
    conteoEsperado: number
    diferencia: number
    nota: string
}
