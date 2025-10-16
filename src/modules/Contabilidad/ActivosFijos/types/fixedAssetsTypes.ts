export type FixedAssetType = {
    id?: string
    description: string
    brand: string
    model: string
    serialNumber: string
    acquisitionDate: string
    supplier: string
    invoice: string
    originalValue: number
    usefulLife: number
    accountingAccount: string
    physicalLocation: string
    area: string
    responsible: string
    notes: string
    status: 'Activo' | 'Dado de baja'
    creationDate?: Date
}

export type FixedAssetResponseType = {
    id: string
    descripcion: string
    marca: string
    modelo: string
    numeroSerie: string
    fechaAdquisicion: string
    proveedor: string
    factura: string
    valorOriginal: number
    vidaUtil: number
    cuentaContable: string
    ubicacionFisica: string
    area: string
    responsable: string
    notas: string
    estatus: 'Activo' | 'Dado de baja'
    fechaCreacion: Date
}

export type FixedAssetFormType = {
    description: string
    brand: string
    model: string
    serialNumber: string
    acquisitionDate: string
    supplier: string
    invoice: string
    originalValue: number
    usefulLife: number
    accountingAccount: string
    physicalLocation: string
    area: string
    responsible: string
    notes: string
    status: 'Activo' | 'Dado de baja'
}
