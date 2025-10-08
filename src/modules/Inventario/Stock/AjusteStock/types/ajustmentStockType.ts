export type AdjustmentStockFormType = {
    name: string
    slug: string
    status: boolean
} 

export type AdjustmentnStockType = {
    id?: number
    warehouse: string
    store: string
    product: string
    FechaCreacion?: Date
    quantity: number
    user: string
}

export type AdjustmentResponseStock ={
    id?: number
    almacen: string
    tienda: string
    nombre: string
    FechaCreacion?: Date
    cantidad: number
    persona_responsable: string
    producto: string

}

