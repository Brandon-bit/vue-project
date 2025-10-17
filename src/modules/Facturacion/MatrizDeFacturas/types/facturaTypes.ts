export type TipoFacturaEnum = 'todas' | 'emitidas' | 'recibidas'
export type EstatusFacturaEnum = 'todos' | 'vigente' | 'cancelada'

export type FacturaType = {
    id: string
    tipo: 'emitida' | 'recibida'
    folioFiscal: string
    folio: string
    emisor: string
    receptor: string
    fecha: string
    total: number
    estatus: 'vigente' | 'cancelada'
}

export type FiltrosFacturaType = {
    tipo: TipoFacturaEnum
    estatus: EstatusFacturaEnum
    fechaDesde: string
    fechaHasta: string
    busqueda: string
}

export type ResumenFacturasType = {
    emitidasVigentes: number
    recibidasVigentes: number
    totalEmitido: number
    totalRecibido: number
}

export type ConfiguracionSATType = {
    rfc: string
    contrasenaCIEC: string
}
