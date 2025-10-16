import { defineStore } from 'pinia'
import type { JournalBookFiltersType, JournalEntryType } from '@/modules/Contabilidad/LibrosDeDiario/types/journalBooksTypes'

const initialFilters: JournalBookFiltersType = {
    month: new Date().getMonth().toString().padStart(2, '0'),
    year: new Date().getFullYear().toString(),
    policyType: 'todas'
}

const useJournalBooksStore = defineStore('journal-books-store', {
    state: () => ({
        filters: initialFilters as JournalBookFiltersType,
        journalEntries: [] as JournalEntryType[],
        bookGenerated: false,
        loading: false
    }),
    actions: {
        setFilters(filters: JournalBookFiltersType) {
            this.filters = filters
        },
        setJournalEntries(entries: JournalEntryType[]) {
            this.journalEntries = entries
        },
        setBookGenerated(status: boolean) {
            this.bookGenerated = status
        },
        setLoading(status: boolean) {
            this.loading = status
        },
        resetFilters() {
            this.filters = initialFilters
            this.bookGenerated = false
            this.journalEntries = []
        }
    },
    getters: {
        totalDebit: (state) => {
            return state.journalEntries.reduce((sum, entry) => sum + entry.debit, 0)
        },
        totalCredit: (state) => {
            return state.journalEntries.reduce((sum, entry) => sum + entry.credit, 0)
        },
        difference: (state) => {
            const debit = state.journalEntries.reduce((sum, entry) => sum + entry.debit, 0)
            const credit = state.journalEntries.reduce((sum, entry) => sum + entry.credit, 0)
            return debit - credit
        }
    }
})

export default useJournalBooksStore
