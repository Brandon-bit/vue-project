export type CategoryType = {
    id?: number
    name: string
    slug: string
    status: boolean
    creationDate: Date
    imageUrl: string
}

export type CategoryResponseType = {
    id: number,
    nombre: string,
    slug: string,
    urlImagen: string,
    fechaCreacion: Date,
    activo: boolean,
    eliminado: boolean
}

export type CategoryFormType = {
    name: string
    slug: string
    status: boolean
    image: FileList
    removeImage: boolean
}