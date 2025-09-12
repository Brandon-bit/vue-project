export type LowStockType = {
    id?: number
    almacen: string
    tienda: string
    nombre: string
    categoria: string
    sku: string
    cantidad: number | string
    cantidadAlerta: number | string
    imagen: string
}

export type LowStockFormType = {
    cantidad: number | string
    cantidadAlerta: number | string
}
