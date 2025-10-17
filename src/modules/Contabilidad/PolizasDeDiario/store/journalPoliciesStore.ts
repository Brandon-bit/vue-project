import { defineStore } from 'pinia'
import type { JournalPolicyType, JournalEntryItemType } from '@/modules/Contabilidad/PolizasDeDiario/types/journalPoliciesTypes'

const initialPolicy: JournalPolicyType = {
    id: undefined,
    folio: '',
    date: new Date().toISOString().split('T')[0],
    concept: '',
    total: 0,
    user: '',
    entries: []
}

const useJournalPoliciesStore = defineStore('journal-policies-store', {
    state: () => ({
        selectedPolicy: initialPolicy as JournalPolicyType,
        modalId: 'journal-policy-modal'
    }),
    actions: {
        setData(data: JournalPolicyType = initialPolicy) {
            this.selectedPolicy = data
        },
        addEntry() {
            const newEntry: JournalEntryItemType = {
                id: `P-${Date.now()}`,
                account: '',
                description: '',
                debit: 0,
                credit: 0,
                reference: ''
            }
            this.selectedPolicy.entries.push(newEntry)
        },
        removeEntry(id: string) {
            this.selectedPolicy.entries = this.selectedPolicy.entries.filter(e => e.id !== id)
        },
        updateEntry(id: string, field: keyof JournalEntryItemType, value: any) {
            const entry = this.selectedPolicy.entries.find(e => e.id === id)
            if (entry) {
                (entry as any)[field] = value
            }
        }
    },
    getters: {
        totalDebit: (state) => {
            return state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.debit || 0), 0)
        },
        totalCredit: (state) => {
            return state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.credit || 0), 0)
        },
        isBalanced: (state) => {
            const debit = state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.debit || 0), 0)
            const credit = state.selectedPolicy.entries.reduce((sum, entry) => sum + (entry.credit || 0), 0)
            return Math.abs(debit - credit) < 0.01 && debit > 0
        }
    }
})

export default useJournalPoliciesStore
