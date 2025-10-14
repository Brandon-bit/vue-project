export type InventoryThreshold = {
    id?: number
    sku: string
    productoId: number
    productoNombre: string
    minimo: number
    maximo: number
    stock: number
    puntos_reorden: number
    sugerencia: string
}

export type InventoryThresholdDTO = {
    id?: number
    sku: string
    productId: number
    productName: string
    minimum: number
    maximum: number
    stock: number
    reorderPoints: number
    suggestion: string
}

export type InventoryFormDTO = {
    id?: number
    productId: number
    productName: string
    minimum: number
    maximum: number
    reorderPoints: number
    suggestion: string
}

export type InventoryForm = {
    id?: number
    minimo: number
    productoId: number
    productoNombre: string
    maximo: number
    puntos_reorden: number
    sugerencia: string
}
