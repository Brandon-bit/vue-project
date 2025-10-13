export type WarrantyType = {
    id?: number
    name: string
    duration: number
    period: 'DIAS' | 'SEMANAS' | 'MESES' | 'ANIOS' | undefined
    description: string
    creationDate: Date
    active: boolean
}

export type WarrantyResponseType = {
    id: number
    nombre: string
    duracion: string
    periodo: 'DIAS' | 'SEMANAS' | 'MESES' | 'ANIOS' | undefined
    descripcion: string
    fechaCreacion: Date
    activo: boolean
}

export type WarrantyRequestType = {
    id?: number
    nombre: string
    duracion: number
    periodo: 'DIAS' | 'SEMANAS' | 'MESES' | 'ANIOS' | undefined
    descripcion: string
    fechaCreacion?: Date
    FechaActualizacion?: Date
    activo: boolean
}

export type WarrantyFormType = {
    name: string
    duration: number
    period: 'DIAS' | 'SEMANAS' | 'MESES' | 'ANIOS' | undefined
    description: string
    active: boolean
}