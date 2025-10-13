import {
    InventoryAuditSummary,
    InventoryAuditSummaryDTO,
    InventoryAudit,
    InventoryAuditDTO,
    InventoryAuditor,
    InventoryAuditorDTO,
    Product,
    ProductPayload,
    InventoryAuditRequestPayload,
    InventoryAuditRequest
} from '@inventario/Operacion/AuditoriaDeInventarios/types/inventoryAuditTypes'

export const mapInventoryAuditSummary = (
    data: InventoryAuditSummary
): InventoryAuditSummaryDTO => ({
    title: data.titulo,
    quantity: data.cantidad
})

export const mapInventoryAuditors = (data: InventoryAuditor): InventoryAuditorDTO => ({
    id: data.id,
    name: data.nombre
})

export const mapInventoryAuditRecords = (data: InventoryAudit): InventoryAuditDTO => ({
    id: data.id,
    date: data.fecha,
    auditorId: data.auditorId,
    auditorName: data.auditorNombre,
    generalNote: data.notaGeneral,
    calification: data.calificacion,
    stateId: data.estadoId,
    state: data.estado,
    auditedProducts: data.productosAuditados
})

export const mapInventoryAuditRequest = (
    data: InventoryAuditRequest
): InventoryAuditRequestPayload => ({
    fecha: data.date,
    auditorId: data.auditorId,
    notaGeneral: data.generalNote,
    estadoId: data.stateId
})
export const mapProduct = (data: Product): ProductPayload => ({
    id: data.id,
    productoId: data.productId,
    productoNombre: data.productName,
    conteoReal: data.realCount,
    conteoEsperado: data.expectedCount,
    diferencia: data.difference,
    nota: data.note
})

export const mapProductDTO = (data: ProductPayload): Product => ({
    id: data.id,
    productId: data.productoId,
    productName: data.productoNombre,
    realCount: data.conteoReal,
    expectedCount: data.conteoEsperado,
    difference: data.diferencia,
    note: data.nota
})
