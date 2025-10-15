import { defineStore } from 'pinia'
import type { AccountingPolicyType, AccountingEntryItemType } from '@/modules/Contabilidad/PolizasContables/types/accountingPoliciesTypes'

const initialPolicy: AccountingPolicyType = {
    id: undefined,
    folio: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Diario',
    concept: '',
    total: 0,
    status: 'Descuadrada',
    entries: [
        {
            id: `P-${Date.now()}`,
            account: '',
            description: '',
            debit: 0,
            credit: 0,
            reference: ''
        }
    ]
}

const useAccountingPoliciesStore = defineStore('accounting-policies-store', {
    state: () => ({
        selectedPolicy: initialPolicy as AccountingPolicyType,
        modalId: 'accounting-policy-modal',
        isEditMode: false
    }),
    actions: {
        setData(data: AccountingPolicyType = initialPolicy) {
            this.selectedPolicy = JSON.parse(JSON.stringify(data))
        },
        setEditMode(value: boolean) {
            this.isEditMode = value
        },
        addEntry() {
            const newEntry: AccountingEntryItemType = {
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
            if (this.selectedPolicy.entries.length > 1) {
                this.selectedPolicy.entries = this.selectedPolicy.entries.filter(e => e.id !== id)
            }
        },
        updateEntry(id: string, field: keyof AccountingEntryItemType, value: any) {
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

export default useAccountingPoliciesStore
