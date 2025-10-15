export type AccountingMovementType = {
    date: string
    policy: string
    account: string
    description: string
    debit: number
    credit: number
    balance: number
    document?: string
}

export type AccountingMovementResponseType = {
    fecha: string
    poliza: string
    cuenta: string
    descripcion: string
    debe: number
    haber: number
    saldo: number
    documento?: string
}

export type SearchFiltersType = {
    startDate: string
    endDate: string
    account: string
    policyFolio: string
    costCenter: string
    sourceDocument: string
}
