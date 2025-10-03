export type Warehouse = {
    id: number
    nombre: string
}

export type WarehouseDTO = {
    id: number
    name: string
}

export type Supplier = {
    id: number
    nombre: string
}

export type SupplierDTO = {
    id: number
    name: string
}

export type InventoryEntry = {
    id: number
    almacenId: number
    nombreAlmacen: string
    proveedorId: number
    nombreProveedor: string
    fecha: string
    documentoReferencia: string
    observaciones: string
    tipoMovimientoId: number
    tipoMovimiento: string
    estadoId: number
    estado: string
    productos?: ProductPayload[]
}

export type InventoryEntryDTO = {
    id: number
    warehouseId: number
    warehouseName: string
    supplierId: number
    supplierName: string
    date: string
    referenceDocument: string
    observations: string
    movementTypeId: number
    movementType: string
    stateId: number
    state: string
}

export type InventoryEntryForm = {
    id: number
    warehouseId: number
    supplierId: number
    date: string
    referenceDocument: string
    movementTypeId: number
    stateId: number
    observations: string
}

export type InventoryEntryRequest = {
    warehouseId: number
    supplierId: number
    date: string
    referenceDocument: string
    stateId: number
    movementTypeId: number
    observations: string
}

export type InventoryEntryRequestPayload = {
    almacenId: number
    proveedorId: number
    fecha: string
    documentoReferencia: string
    estadoId: number
    movimientoId: number
    observaciones: string
    products?: ProductPayload[]
}

export type Product = {
    id?: number | undefined
    productId: number
    productName: string
    quantity: number
    unitPrice: number
    subtotal: number
    batch: string
    expirationDate: string
}

export type ProductPayload = {
    id?: number | undefined
    productoId: number
    productoNombre: string
    cantidad: number
    precioUnitario: number
    subtotal: number
    lote: string
    fechaExpiracion: string
}
