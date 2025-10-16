export type AccountingEntryItemType = {
    id: string
    account: string
    description: string
    debit: number
    credit: number
    reference: string
}

export type AccountingPolicyType = {
    id?: number
    folio: string
    date: string
    type: 'Diario' | 'Ingreso' | 'Egreso'
    concept: string
    total: number
    status: 'Cuadrada' | 'Descuadrada'
    entries: AccountingEntryItemType[]
}

export type AccountingPolicyResponseType = {
    id: number
    folio: string
    fecha: string
    tipo: 'Diario' | 'Ingreso' | 'Egreso'
    concepto: string
    total: number
    estatus: 'Cuadrada' | 'Descuadrada'
    partidas: AccountingEntryItemResponseType[]
}

export type AccountingEntryItemResponseType = {
    id: string
    cuenta: string
    descripcion: string
    debe: number
    haber: number
    referencia: string
}

export type AccountingPolicyFormType = {
    folio: string
    date: string
    type: 'Diario' | 'Ingreso' | 'Egreso'
    concept: string
    entries: AccountingEntryItemType[]
}
