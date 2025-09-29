export type SubCategoryType = {
    id?: number
    name: string
    parentCateogryName: string
    parentCategoryId: number
    slug: string
    status: boolean
    creationDate: Date
    imageUrl: string
}

export type SubCategoryResponseType = {
    id: number,
    nombre: string,
    idCategoriaPadre: number,
    nombreCategoriaPadre: string,
    slug: string,
    urlImagen: string,
    fechaCreacion: Date,
    activo: boolean,
    eliminado: boolean
}

export type SubCategoryFormType = {
    name: string
    slug: string
    parentCategoryId: number
    status: boolean
    image: FileList
    removeImage: boolean
}

export type ParentCategoryResponseType = {
    id: number,
    nombre: string,
}

export type ParentCategoryType = {
    id: number,
    label: string,
}