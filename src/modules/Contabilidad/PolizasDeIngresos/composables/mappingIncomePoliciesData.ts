import type { 
    IncomePolicyResponseType,
    IncomePolicyFormType, 
    IncomePolicyType,
    IncomeEntryItemType,
    IncomeEntryItemResponseType
} from '@/modules/Contabilidad/PolizasDeIngresos/types/incomePoliciesTypes'

export const mapIncomeEntryItem = (model: IncomeEntryItemResponseType): IncomeEntryItemType => {
    return {
        id: model.id,
        account: model.cuenta,
        description: model.descripcion,
        debit: model.debe,
        credit: model.haber,
        reference: model.referencia
    }
}

export const mapIncomePolicy = (model: IncomePolicyResponseType): IncomePolicyType => {
    return {
        id: model.id,
        folio: model.folio,
        date: model.fecha,
        client: model.cliente,
        concept: model.concepto,
        total: model.total,
        paymentMethod: model.metodoPago,
        bankAccount: model.cuentaBancaria,
        bankReference: model.referenciaBancaria,
        entries: model.partidas.map(mapIncomeEntryItem)
    }
}

export const mapIncomePolicyRequest = (model: IncomePolicyFormType): any => {
    return {
        fecha: model.date,
        cliente: model.client,
        concepto: model.concept,
        metodoPago: model.paymentMethod,
        cuentaBancaria: model.bankAccount,
        referenciaBancaria: model.bankReference || '',
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
