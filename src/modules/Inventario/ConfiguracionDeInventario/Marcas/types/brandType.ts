export type BrandType = {
    id?: number
    name: string
    creationDate: Date
    active: boolean
    imageUrl: string
}

export type BrandFormType = {
    name: string
    image: FileList
    active: boolean
    removeImage: boolean
}

export type BrandResponseType = {
    id: number
    nombre: string
    urlLogo: string
    fechaCreacion: Date
    activo: boolean
}