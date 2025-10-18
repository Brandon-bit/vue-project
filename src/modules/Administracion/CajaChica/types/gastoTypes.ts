export type GastoType = {
    id?: number
    cajaId: number
    cajaNombre: string
    fecha: Date
    concepto: string
    monto: number
    responsable: string
    centroCosto: string
    descripcion: string
    status: 'Pendiente' | 'Aprobado' | 'Rechazado'
    comprobanteUrl: string
    creationDate: Date
}

export type GastoResponseType = {
    id: number
    cajaId: number
    cajaNombre: string
    fecha: Date
    concepto: string
    monto: number
    responsable: string
    centroCosto: string
    descripcion: string
    status: string
    urlComprobante: string
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type GastoFormType = {
    cajaId: number
    fecha: string
    concepto: string
    monto: number
    centroCosto: string
    descripcion: string
    comprobante: FileList
    removeComprobante: boolean
}

export type CajaChicaType = {
    id: number
    nombre: string
    asignado: number
    saldo: number
    responsable: string
}

export type CajaChicaResponseType = {
    id: number
    nombre: string
    montoAsignado: number
    saldoActual: number
    responsable: string
}
