export type JournalEntryItemType = {
    id: string
    account: string
    description: string
    debit: number
    credit: number
    reference: string
}

export type JournalPolicyType = {
    id?: number
    folio: string
    date: string
    concept: string
    total: number
    user: string
    entries: JournalEntryItemType[]
}

export type JournalPolicyResponseType = {
    id: number
    folio: string
    fecha: string
    concepto: string
    total: number
    usuario: string
    partidas: JournalEntryItemResponseType[]
}

export type JournalEntryItemResponseType = {
    id: string
    cuenta: string
    descripcion: string
    debe: number
    haber: number
    referencia: string
}

export type JournalPolicyFormType = {
    date: string
    concept: string
    entries: JournalEntryItemType[]
}
