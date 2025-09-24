import {
    InventoryAuditSummaryItemTranslatedType,
    InventoryAuditSummaryItemType,
    InventoryAuditRecordsType,
    InventoryAuditRecordsTranslatedType,
    InventoryAuditorsTransalatedType,
    InventoryAuditorsType,
    InventoryAuditRecordPayload
} from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

export const mapInventoryAuditSummaryItem = (
    data: InventoryAuditSummaryItemType
): InventoryAuditSummaryItemTranslatedType => ({
    title: data.titulo,
    quantity: data.cantidad
})

export const mapInventoryAuditRecords = (
    data: InventoryAuditRecordsType
): InventoryAuditRecordsTranslatedType => ({
    id: data.id,
    date: data.fecha,
    auditorId: data.auditorId,
    auditorName: data.auditorNombre,
    productId: data.productoId,
    product: data.producto,
    count: data.conteo,
    difference: data.diferencia,
    note: data.nota
})

export const mapInventoryAuditRecordToBackend = (
    data: InventoryAuditRecordsTranslatedType
): InventoryAuditRecordPayload => ({
    fecha: data.date,
    auditorId: data.auditorId,
    productoId: data.productId,
    conteo: data.count,
    diferencia: data.difference,
    nota: data.note
})

export const mapInventoryAuditors = (
    data: InventoryAuditorsType
): InventoryAuditorsTransalatedType => ({
    id: data.id,
    name: data.nombre
})
