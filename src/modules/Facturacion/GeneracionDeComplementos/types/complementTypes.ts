export type ComplementTypeEnum = 'pago' | 'cartaporte' | ''

export type CFDIDisponibleType = {
    id: string
    folio: string
    uuid: string
    receptor: string
    fecha: string
    total: number
    metodoPago: string
}

export type ComplementoPagoFormType = {
    cfdiRelacionado: CFDIDisponibleType | null
    fechaPago: string
    formaPago: string
    montoPago: number
    moneda: string
    bancoOrdenante?: string
    cuentaOrdenante?: string
    bancoBeneficiario?: string
    cuentaBeneficiaria?: string
    numeroOperacion?: string
}

export type ComplementoCartaPorteFormType = {
    cfdiRelacionado: CFDIDisponibleType | null
    tipoTransporte: string
    origen: string
    destino: string
    // Agregar más campos según necesidad
}

export type ComplementoGeneradoType = {
    id: number
    tipo: 'pago' | 'cartaporte'
    folio: string
    uuid: string
    cfdiRelacionado: string
    fecha: string
    estatus: 'Vigente' | 'Cancelado'
}

export type FormaPagoType = {
    id: string
    label: string
}
