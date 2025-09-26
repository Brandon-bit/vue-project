import {
    OrderManagementRecordsType,
    OrderManagementRecordsTranslatedType,
    SuppliersTransalatedType,
    SuppliersType
} from '@inventario/Operacion/GestionDePedidos/types/orderManagementTypes'

export const mapOrderManagementRecords = (
    data: OrderManagementRecordsType
): OrderManagementRecordsTranslatedType => ({
    id: data.id,
    folio: data.folio,
    supplierId: data.idProveedor,
    supplier: data.proveedor,
    date: data.fecha,
    state: data.estado,
    stateId: data.estadoId
})

// export const mapOrderManagementToBackend = (
//     data: OrderManagementRecordsTranslatedType
// ): InventoryAuditRecordPayload => ({
//     fecha: data.date,
//     auditorId: data.auditorId,
//     productoId: data.productId,
//     conteo: data.count,
//     diferencia: data.difference,
//     nota: data.note
// })

export const mapInventorySuppliers = (data: SuppliersType): SuppliersTransalatedType => ({
    id: data.id,
    name: data.nombre
})
