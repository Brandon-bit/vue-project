export type CategoryRequestType = {
    Id?: number
    IdCategoriaPadre?: number
    Nombre: string
    Slug: string
    UrlImagen?: string
    idUsuario?: string
    FechaCreacion?: Date
    FechaActualizacion?: Date
    Activo: boolean
    Eliminado: false
}