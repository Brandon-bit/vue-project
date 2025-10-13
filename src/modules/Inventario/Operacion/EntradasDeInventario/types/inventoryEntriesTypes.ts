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
    idProveedor: number
    idTipoMovimiento: number
    idEstado: number
    idAlmacen: number
    fechaEntrada: string
    documentoReferencia: string
    observaciones: string
    nombreProveedor: string
    nombreAlmacen: string
    nombreTipoMovimiento: string
    nombreEstado: string
    detalles: ProductPayload[]
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
    idAlmacen: number
    idProveedor: number
    fechaEntrada: string
    documentoReferencia: string
    idEstado: number
    idTipoMovimiento: number
    observaciones: string
    detalles?: ProductPayload[]
}

export type Product = {
    id?: number | undefined
    productId: number
    productName?: string
    quantity: number
    unitPrice: number
    subtotal: number
    batch: string
    expirationDate: string
}

export type ProductPayload = {
    id?: number | undefined
    idProducto: number
    productoNombre?: string
    cantidad: number
    costoUnitario: number
    subtotal: number
    lote: string
    fechaExpiracion: string
}

export type InventoryEntryResponseType<T> = {
    items: T[]
    totalItems: number
    page: number
    pageSize: number
}
