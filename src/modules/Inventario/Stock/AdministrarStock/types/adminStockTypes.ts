export type AdminStockFormType = {
    name: string
    slug: string
    status: boolean
} 

export type AdminStockType = {
    id?: number
    warehouse: string
    store: string
    product: string
    FechaCreacion?: Date
    quantity: number
    user: string
}

