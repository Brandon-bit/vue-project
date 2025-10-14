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

export type InventoryWithdrawal = {
    id: number
    almacenId: number
    nombreAlmacen: string
    destinoId: number
    nombreDestino: string
    fecha: string
    documentoReferencia: string
    observaciones: string
    tipoMovimientoId: number
    tipoMovimiento: string
    estadoId: number
    estado: string
    productos?: ProductPayload[]
}

export type InventoryWithdrawalDTO = {
    id: number
    warehouseId: number
    warehouseName: string
    destinationId: number
    destinationName: string
    date: string
    referenceDocument: string
    observations: string
    movementTypeId: number
    movementType: string
    stateId: number
    state: string
}

export type InventoryWithdrawalForm = {
    id: number
    warehouseId: number
    destinationId: number
    date: string
    referenceDocument: string
    movementTypeId: number
    stateId: number
    observations: string
}

export type InventoryWithdrawalRequest = {
    warehouseId: number
    supplierId: number
    date: string
    referenceDocument: string
    stateId: number
    movementTypeId: number
    observations: string
}

export type InventoryWithdrawalRequestPayload = {
    almacenId: number
    proveedorId: number
    fecha: string
    documentoReferencia: string
    estadoId: number
    movimientoId: number
    observaciones: string
    productos?: ProductPayload[]
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
