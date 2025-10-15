export type IncomeEntryItemType = {
    id: string
    account: string
    description: string
    debit: number
    credit: number
    reference: string
}

export type IncomePolicyType = {
    id?: number
    folio: string
    date: string
    client: string
    concept: string
    total: number
    paymentMethod: string
    bankAccount: string
    bankReference: string
    entries: IncomeEntryItemType[]
}

export type IncomePolicyResponseType = {
    id: number
    folio: string
    fecha: string
    cliente: string
    concepto: string
    total: number
    metodoPago: string
    cuentaBancaria: string
    referenciaBancaria: string
    partidas: IncomeEntryItemResponseType[]
}

export type IncomeEntryItemResponseType = {
    id: string
    cuenta: string
    descripcion: string
    debe: number
    haber: number
    referencia: string
}

export type IncomePolicyFormType = {
    date: string
    client: string
    concept: string
    paymentMethod: string
    bankAccount: string
    bankReference: string
    entries: IncomeEntryItemType[]
}

export type InvoiceType = {
    id: string
    folio: string
    amount: number
    date: string
}
