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
    priceAndStock: SingleProductType
    image: FileList | null
    extraInfo: ExtraInfoType
}

export type SingleProductType = {
    price: number
    idTaxType: string
    tax: number
}

export type VariantProductType = {
    variant: string
}

export type ExtraInfoType = {
    idWarranty: string | null
    manufacturingDate: Date | null
    expirationDate: Date | null
}



export type CreateVariantFormType = {
    variant: string
    variantValue: string
    skuVariant: string
    barcodeSimbology: string
    itemBarcode: string
    quantity: number | string
    quantityAlert: number | string
    price: number | string
    taxType: string
    tax: string
    discountType: string
    discountValue: number | string
    variantImage: any
    dragDropImage: any
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

