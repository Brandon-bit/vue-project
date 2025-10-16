import { defineStore } from 'pinia'
import type { IncomePolicyType, IncomeEntryItemType, InvoiceType } from '@/modules/Contabilidad/PolizasDeIngresos/types/incomePoliciesTypes'

const initialPolicy: IncomePolicyType = {
    id: undefined,
    folio: '',
    date: new Date().toISOString().split('T')[0],
    client: '',
    concept: '',
    total: 0,
    paymentMethod: '',
    bankAccount: '',
    bankReference: '',
    entries: []
}

const useIncomePoliciesStore = defineStore('income-policies-store', {
    state: () => ({
        selectedPolicy: initialPolicy as IncomePolicyType,
        modalId: 'income-policy-modal',
        invoiceModalId: 'invoice-link-modal',
        showInvoiceModal: false
    }),
    actions: {
        setData(data: IncomePolicyType = initialPolicy) {
            this.selectedPolicy = data
        },
        addEntry() {
            const newEntry: IncomeEntryItemType = {
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
        updateEntry(id: string, field: keyof IncomeEntryItemType, value: any) {
            const entry = this.selectedPolicy.entries.find(e => e.id === id)
            if (entry) {
                (entry as any)[field] = value
            }
        },
        linkInvoice(invoice: InvoiceType) {
            // Auto-generate suggested entries
            const suggestedEntries: IncomeEntryItemType[] = [
                {
                    id: `P-${Date.now()}-1`,
                    account: '102-001 Bancos',
                    description: 'Cargo a banco por cobro',
                    debit: invoice.amount,
                    credit: 0,
                    reference: invoice.folio
                },
                {
                    id: `P-${Date.now()}-2`,
                    account: '105-001 Clientes',
                    description: 'Abono a cuenta de cliente',
                    debit: 0,
                    credit: invoice.amount * 0.86,
                    reference: invoice.folio
                },
                {
                    id: `P-${Date.now()}-3`,
                    account: '208-001 IVA Trasladado',
                    description: 'IVA trasladado cobrado',
                    debit: 0,
                    credit: invoice.amount * 0.14,
                    reference: invoice.folio
                }
            ]
            this.selectedPolicy.entries = suggestedEntries
            this.showInvoiceModal = false
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

export default useIncomePoliciesStore
