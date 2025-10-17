export type PurchaseOrderType = {
    id: number
    folio: string
    supplier: string
    date: string
    total: number
    status: 'Emitida' | 'Confirmada' | 'Entregada' | 'Cerrada'
    items: number
}

export type ApprovedRequestType = {
    id: number
    folio: string
    requester: string
    area: string
    total: number
    items: number
}

export type PurchaseOrderFormType = {
    creationMode: 'solicitud' | 'directa'
    requestId?: number
    supplierId: string
    requestingArea?: string
    expectedDeliveryDays: string
}

export type OrderStatsType = {
    emitidas: number
    confirmadas: number
    entregadas: number
    totalComprometido: number
}

export type OrderStatusType = 'Emitida' | 'Confirmada' | 'Entregada' | 'Cerrada'
