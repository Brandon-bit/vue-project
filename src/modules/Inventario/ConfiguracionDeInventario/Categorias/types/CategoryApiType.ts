// Type that is received from the API
export type CategoryApiType = {
    id: number,
    idCategoriaPadre: number,
    nombre: string,
    slug: string,
    urlImagen: string,
    nombreCategoriaPadre: string,
    idUsuario: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    activo: boolean,
    eliminado: boolean
}
