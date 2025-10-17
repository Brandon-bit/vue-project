import type { 
    ExpensePolicyResponseType,
    ExpensePolicyFormType, 
    ExpensePolicyType,
    ExpenseEntryItemType,
    ExpenseEntryItemResponseType
} from '@/modules/Contabilidad/PolizasDeGastos/types/expensePoliciesTypes'

export const mapExpenseEntryItem = (model: ExpenseEntryItemResponseType): ExpenseEntryItemType => {
    return {
        id: model.id,
        account: model.cuenta,
        description: model.descripcion,
        debit: model.debe,
        credit: model.haber,
        reference: model.referencia
    }
}

export const mapExpensePolicy = (model: ExpensePolicyResponseType): ExpensePolicyType => {
    return {
        id: model.id,
        folio: model.folio,
        date: model.fecha,
        supplier: model.proveedor,
        concept: model.concepto,
        total: model.total,
        expenseType: model.tipoGasto,
        costCenter: model.centroCosto,
        paymentMethod: model.metodoPago,
        bankAccount: model.cuentaBancaria,
        paymentReference: model.referenciaPago,
        entries: model.partidas.map(mapExpenseEntryItem)
    }
}

export const mapExpensePolicyRequest = (model: ExpensePolicyFormType): any => {
    return {
        fecha: model.date,
        proveedor: model.supplier,
        concepto: model.concept,
        tipoGasto: model.expenseType,
        centroCosto: model.costCenter,
        metodoPago: model.paymentMethod,
        cuentaBancaria: model.bankAccount,
        referenciaPago: model.paymentReference || '',
        partidas: model.entries.map(entry => ({
            id: entry.id,
            cuenta: entry.account,
            descripcion: entry.description,
            debe: entry.debit,
            haber: entry.credit,
            referencia: entry.reference || ''
        }))
    }
}
