import {
    InventoryThreshold,
    InventoryThresholdDTO,
    InventoryForm,
    InventoryFormDTO
} from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

export const mapResponseData = (data: InventoryThreshold): InventoryThresholdDTO => ({
    id: data.id,
    sku: data.sku,
    productName: data.productoNombre,
    productId: data.productoId,
    minimum: data.minimo,
    maximum: data.maximo,
    stock: data.stock,
    reorderPoints: data.puntos_reorden,
    suggestion: data.sugerencia
})

export const mapRequestData = (data: InventoryFormDTO): InventoryForm => ({
    id: data.id,
    productoId: data.productId,
    productoNombre: data.productName,
    minimo: data.minimum,
    maximo: data.maximum,
    puntos_reorden: data.reorderPoints,
    sugerencia: data.suggestion
})
