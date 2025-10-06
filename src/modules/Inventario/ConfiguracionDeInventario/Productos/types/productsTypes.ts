export type ProductType = {
    id: number
    sku: string
    name: string
    categoryId: number
    categoryName: string
    brandId: number
    brandName: string
    price: number
    unitId: number
    unitName: string
    quantity: number
    urlImage: string
}

export type ProductResponseType = {
    id: number
    idCategoria: number
    idSubcategoria: number
    idMarca: number
    idUnidad: number
    idTipoImpuesto: number
    idTipoDescuento: number
    nombre: string
    slug: string
    sku: string
    codigoBarras: string
    descripcion: string
    precioBase: number
    fechaCreacion: Date
    activo: boolean
}
