export type ConceptoType = {
    id: string
    claveProdServ: string
    claveUnidad: string
    descripcion: string
    cantidad: number
    valorUnitario: number
    importe: number
    iva: number
    total: number
}

export type EmisorType = {
    rfc: string
    razonSocial: string
    regimenFiscal: string
    codigoPostal: string
}

export type ReceptorType = {
    rfc: string
    razonSocial: string
    regimenFiscal: string
    codigoPostal: string
    usoCFDI: string
}

export type ComprobanteType = {
    metodoPago: string
    formaPago: string
    moneda: string
}

export type CFDIFormType = {
    emisor: EmisorType
    receptor: ReceptorType
    comprobante: ComprobanteType
    conceptos: ConceptoType[]
}

export type CFDIGeneradoType = {
    id: number
    folio: string
    uuid: string
    serie: string
    receptor: string
    fecha: string
    total: number
    estatus: 'Vigente' | 'Cancelado'
    metodoPago: string
}

export type TotalesCFDIType = {
    subtotal: number
    totalIVA: number
    total: number
}

export type ClaveUnidadType = {
    id: string
    label: string
}

export type UsoCFDIType = {
    id: string
    label: string
}

export type MetodoPagoType = {
    id: string
    label: string
}

export type FormaPagoType = {
    id: string
    label: string
}
