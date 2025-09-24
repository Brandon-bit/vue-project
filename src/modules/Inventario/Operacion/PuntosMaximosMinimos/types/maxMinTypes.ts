export type InventoryThresholdsType = {
    id?: number
    sku: string
    nombre: string
    minimo: number
    maximo: number
    stock: number
    puntos_reorden: number
    sugerencia: string
}

export type InventoryThresholdsResponseType = {
    id?: number
    sku: string
    name: string
    minimum: number
    maximum: number
    stock: number
    reorderPoints: number
    suggestion: string
}

export type InventoryFormType = {
    id?: number
    minimum: number
    maximum: number
    stock: number
    reorderPoints: number
    suggestion: string
}

export type InventoryFormResponseType = {
    id?: number
    minimo: number
    maximo: number
    stock: number
    puntos_reorden: number
    sugerencia: string
}
