export type ProductType = {
    id?: number
    code: string
    name: string
    category: string
    unit: string
    estimatedCost: number
    preferredSupplier: string
    accountingAccount?: string
    description?: string
}

export type ProductResponseType = {
    id: number
    codigo: string
    nombre: string
    categoria: string
    unidad: string
    costoEstimado: number
    proveedorPreferente: string
    cuentaContable?: string
    descripcion?: string
}

export type ProductFormType = {
    code: string
    name: string
    category: string
    unit: string
    estimatedCost: number
    preferredSupplier: string
    accountingAccount?: string
    description?: string
}

export type CatalogStatsType = {
    totalItems: number
    totalCategories: number
    totalSuppliers: number
    estimatedValue: number
}
