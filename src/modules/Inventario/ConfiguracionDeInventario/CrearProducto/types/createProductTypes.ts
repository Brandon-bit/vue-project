export type CreateProductFormType = {
    name: string
    slug: string
    sku: string
    idCategory: string
    idSubCategory: string
    idBrand: string
    idUnit: string
    barcodeSimbology: string
    itemBarcode: string
    description: string
    singleProduct: SingleProductType
    variableProduct: CreateVariantFormType[]
    image: FileList | null
    extraInfo: ExtraInfoType
}

export type CreateProductRequestType = {
    idCategoria: number
    idSubCategoria: number
    idMarca: number
    idUnidad: number
    idTipoImpuesto: number
    idGarantia: number
    nombre: string
    slug: string
    sku: string
    codigobarras: string
    descripcion: string
    precioBase: number
    imagenes: FileList
    informacionAdicional: InformacionAdicionalRequestType
    atributosVariante: AtributoVarianteRequestType[]
}

export type InformacionAdicionalRequestType = {
    idGarantia: number
    fechaFabricacion: Date | null
    fechaExpiracion: Date | null
}

export type AtributoVarianteRequestType = {
    id: number
    nombre: string
    valor: string
    sku: string
    codigobarras: string
    activo: boolean
}

export type SingleProductType = {
    price: number
    idTaxType: string
}

export type VariantAttributeType = {
    idVariant: string
    variantName?: string
    variantValue: string
    variantPrice: number
}
export type CreateVariantFormType = Omit<VariantAttributeType, 'variantName'>

export type ExtraInfoType = {
    idWarranty: string | null
    manufacturingDate: Date | null
    expirationDate: Date | null
}

export type imagesDragValues = {
    id: string
    file: any
    url: string
    name: string
}

export type ProductSkuCodeType = {
    idCategory: number
    idSubCategory: number
}

export type ProductSkuCodeRequestType = {
    idCategoria: number
    idSubCategoria: number
}

export type SkuBarcodeType = {
    sku: string
    barcode: string
}

export type SkuBarcodeResponseType = {
    sku: string
    codigobarras: string
}

