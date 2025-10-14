export type productType = {
    id?: number
    SKU: string
    name: string
    category: string
    brand: string
    price: number
    unit: string
    quantity: number
    user: string
}

export type productDetailType = {
    id: number
    warehouse: string
    slug: string
    sellingType: string
    subcategory: string
    barcodeSimbology: string
    itemBarcode: string
    taxType: string
    tax: number
    discountType: string
    discountValue: number
    quantityAlert: number
    warranty: number
    manufacturer: string
    manufacturedDate: number
    expiryOnDate: number
    images: []
}

export interface ProductTypeApi {
  id: string;
  nombre: string;
  
}

export interface ProductSearchResponse {
  productos: ProductTypeApi[]; // Coincide con la clave "productos"
  TotalItems: number;
}
