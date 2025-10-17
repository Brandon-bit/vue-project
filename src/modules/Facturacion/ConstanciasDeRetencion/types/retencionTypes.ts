export type RetencionType = {
    id: string
    concepto: string
    baseCalculo: number
    tasaISR: number
    montoISR: number
    tasaIVA: number
    montoIVA: number
    total: number
}

export type ConceptoRetencionType = {
    value: string
    label: string
    tasaISR: number
    tasaIVA: number
}

export type ConstanciaFormType = {
    // Receptor
    rfc: string
    razonSocial: string
    regimenFiscal: string
    codigoPostal: string
    
    // Periodo
    mes: string
    anio: string
    
    // Retenciones
    retenciones: RetencionType[]
}

export type ConstanciaGeneradaType = {
    id: number
    folio: string
    uuid: string
    receptor: string
    periodo: string
    totalRetenido: number
    fecha: string
    estatus: 'Vigente' | 'Cancelada'
}

export type TotalesRetencionType = {
    totalISR: number
    totalIVA: number
    total: number
}
