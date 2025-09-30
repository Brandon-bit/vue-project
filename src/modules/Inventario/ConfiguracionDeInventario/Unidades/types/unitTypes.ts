export type UnitType = {
    id?: number
    name: string
    shortName: string
    productsCount: number
    creationDate: Date
    active: boolean
}

export type UnitResponseType = {
    id?: number
    nombre: string
    nombreCorto: string
    idUsuario: string
    fechaCreacion: Date
    fechaActualizacion: Date
    activo: boolean
    eliminado: boolean
}

export type UnitRequestType = {
    Id?: number
    Nombre: string
    NombreCorto: string
    IdUsuario?: string
    FechaCreacion?: string
    FechaActualizacion?: string
    Activo: boolean
    Eliminado: boolean
}

export type UnitFormType = {
    name: string
    shortName: string
    active: boolean
}