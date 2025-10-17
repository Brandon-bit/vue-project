import type { 
    AccountingPolicyResponseType,
    AccountingPolicyFormType, 
    AccountingPolicyType,
    AccountingEntryItemType,
    AccountingEntryItemResponseType
} from '@/modules/Contabilidad/PolizasContables/types/accountingPoliciesTypes'

export const mapAccountingEntryItem = (model: AccountingEntryItemResponseType): AccountingEntryItemType => {
    return {
        id: model.id,
        account: model.cuenta,
        description: model.descripcion,
        debit: model.debe,
        credit: model.haber,
        reference: model.referencia
    }
}

export const mapAccountingPolicy = (model: AccountingPolicyResponseType): AccountingPolicyType => {
    return {
        id: model.id,
        folio: model.folio,
        date: model.fecha,
        type: model.tipo,
        concept: model.concepto,
        total: model.total,
        status: model.estatus,
        entries: model.partidas.map(mapAccountingEntryItem)
    }
}

export const mapAccountingPolicyRequest = (model: AccountingPolicyFormType): any => {
    return {
        folio: model.folio,
        fecha: model.date,
        tipo: model.type,
        concepto: model.concept,
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
