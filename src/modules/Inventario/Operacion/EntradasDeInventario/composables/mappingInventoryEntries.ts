import {
    Warehouse,
    WarehouseDTO,
    Supplier,
    SupplierDTO,
    InventoryEntry,
    InventoryEntryDTO,
    InventoryEntryRequest,
    InventoryEntryRequestPayload,
    Product,
    ProductPayload
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'

export const mapWarehouse = (data: Warehouse): WarehouseDTO => ({
    id: data.id,
    name: data.nombre
})

export const mapSupplier = (data: Supplier): SupplierDTO => ({
    id: data.id,
    name: data.nombre
})

export const mapInventoryEntry = (data: InventoryEntry): InventoryEntryDTO => ({
    id: data.id,
    warehouseId: data.almacenId,
    warehouseName: data.nombreAlmacen,
    supplierId: data.proveedorId,
    supplierName: data.nombreProveedor,
    date: data.fecha,
    referenceDocument: data.documentoReferencia,
    observations: data.observaciones,
    movementTypeId: data.tipoMovimientoId,
    movementType: data.tipoMovimiento,
    stateId: data.estadoId,
    state: data.estado
})

export const mapInventoryEntryRequest = (
    data: InventoryEntryRequest
): InventoryEntryRequestPayload => ({
    almacenId: data.warehouseId,
    proveedorId: data.supplierId,
    fecha: data.date,
    documentoReferencia: data.referenceDocument,
    observaciones: data.observations,
    estadoId: data.stateId,
    movimientoId: data.movementTypeId
})

export const mapProduct = (data: Product): ProductPayload => ({
    id: data.id,
    productoId: data.productId,
    productoNombre: data.productName,
    cantidad: data.quantity,
    precioUnitario: data.unitPrice,
    subtotal: data.subtotal,
    lote: data.batch,
    fechaExpiracion: data.expirationDate
})

export const mapProductDTO = (data: ProductPayload): Product => ({
    id: data.id,
    productId: data.productoId,
    productName: data.productoNombre,
    quantity: data.cantidad,
    unitPrice: data.precioUnitario,
    subtotal: data.subtotal,
    batch: data.lote,
    expirationDate: data.fechaExpiracion
})
