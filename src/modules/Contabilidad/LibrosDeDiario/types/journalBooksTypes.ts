export type JournalEntryType = {
    date: string
    folio: string
    type: string
    concept: string
    account: string
    debit: number
    credit: number
}

export type JournalEntryResponseType = {
    fecha: string
    folio: string
    tipo: string
    concepto: string
    cuenta: string
    debe: number
    haber: number
}

export type JournalBookFiltersType = {
    month: string
    year: string
    policyType: string
}

export type JournalBookSummaryType = {
    totalDebit: number
    totalCredit: number
    difference: number
    entries: JournalEntryType[]
}
