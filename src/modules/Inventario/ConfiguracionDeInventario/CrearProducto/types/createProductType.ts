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
