import {
    InventoryThresholdsResponseType,
    InventoryThresholdsType,
    InventoryFormType,
    InventoryFormResponseType
} from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'

export const mapResponseData = (
    data: InventoryThresholdsType
): InventoryThresholdsResponseType => ({
    sku: data.sku,
    name: data.nombre,
    minimum: data.minimo,
    maximum: data.maximo,
    stock: data.stock,
    reorderPoints: data.puntos_reorden,
    suggestion: data.sugerencia
})

export const mapRequestData = (data: InventoryFormType): InventoryFormResponseType => ({
    minimo: data.minimum,
    maximo: data.maximum,
    stock: data.stock,
    puntos_reorden: data.reorderPoints,
    sugerencia: data.suggestion
})
