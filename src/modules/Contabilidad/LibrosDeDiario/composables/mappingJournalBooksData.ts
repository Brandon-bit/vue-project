import type { 
    JournalEntryResponseType,
    JournalEntryType,
    JournalBookFiltersType
} from '@/modules/Contabilidad/LibrosDeDiario/types/journalBooksTypes'

export const mapJournalEntry = (model: JournalEntryResponseType): JournalEntryType => {
    return {
        date: model.fecha,
        folio: model.folio,
        type: model.tipo,
        concept: model.concepto,
        account: model.cuenta,
        debit: model.debe,
        credit: model.haber
    }
}

export const mapJournalBookFiltersRequest = (model: JournalBookFiltersType): any => {
    return {
        mes: model.month,
        ano: model.year,
        tipoPoliza: model.policyType || 'todas'
    }
}
