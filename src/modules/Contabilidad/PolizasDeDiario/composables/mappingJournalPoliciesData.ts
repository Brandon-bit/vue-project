import type { 
    JournalPolicyResponseType,
    JournalPolicyFormType, 
    JournalPolicyType,
    JournalEntryItemType,
    JournalEntryItemResponseType
} from '@/modules/Contabilidad/PolizasDeDiario/types/journalPoliciesTypes'

export const mapJournalEntryItem = (model: JournalEntryItemResponseType): JournalEntryItemType => {
    return {
        id: model.id,
        account: model.cuenta,
        description: model.descripcion,
        debit: model.debe,
        credit: model.haber,
        reference: model.referencia
    }
}

export const mapJournalPolicy = (model: JournalPolicyResponseType): JournalPolicyType => {
    return {
        id: model.id,
        folio: model.folio,
        date: model.fecha,
        concept: model.concepto,
        total: model.total,
        user: model.usuario,
        entries: model.partidas.map(mapJournalEntryItem)
    }
}

export const mapJournalPolicyRequest = (model: JournalPolicyFormType): any => {
    return {
        fecha: model.date,
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
