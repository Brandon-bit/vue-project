export type ProductsExpirationType = {
    id?: number
    sku: string
    name: string
    manufacturedDate: string
    expirationDate: string
    imageUrl: string
}

export type ProductsExpirationResponseType = {
    id?: number
    sku: string
    nombre: string
    fechaDeCreacion: string
    fechaDeExpiracion: string
    imagenUrl: string
}

export type ProductsExpirationRequestType = {
    fechaDeCreacion: string
    fechaDeExpiracion: string
}

export type ProductsExpirationFormType = {
    manufacturedDate: string
    expirationDate: string
}
