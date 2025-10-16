export type ExpenseEntryItemType = {
    id: string
    account: string
    description: string
    debit: number
    credit: number
    reference: string
}

export type ExpensePolicyType = {
    id?: number
    folio: string
    date: string
    supplier: string
    concept: string
    total: number
    expenseType: string
    costCenter: string
    paymentMethod: string
    bankAccount: string
    paymentReference: string
    entries: ExpenseEntryItemType[]
}

export type ExpensePolicyResponseType = {
    id: number
    folio: string
    fecha: string
    proveedor: string
    concepto: string
    total: number
    tipoGasto: string
    centroCosto: string
    metodoPago: string
    cuentaBancaria: string
    referenciaPago: string
    partidas: ExpenseEntryItemResponseType[]
}

export type ExpenseEntryItemResponseType = {
    id: string
    cuenta: string
    descripcion: string
    debe: number
    haber: number
    referencia: string
}

export type ExpensePolicyFormType = {
    date: string
    supplier: string
    concept: string
    expenseType: string
    costCenter: string
    paymentMethod: string
    bankAccount: string
    paymentReference: string
    entries: ExpenseEntryItemType[]
}

export type SupplierInvoiceType = {
    id: string
    folio: string
    amount: number
    date: string
    concept: string
}
