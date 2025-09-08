export type ProductsExpirationType = {
    id?: number
    sku: string
    nombre: string
    fecha_fabricacion: string
    fecha_expiracion: string
    estado: boolean
    imagen?: string
}

export type ProductsExpirationFormType = {
    fecha_fabricacion: string
    fecha_expiracion: string
}
