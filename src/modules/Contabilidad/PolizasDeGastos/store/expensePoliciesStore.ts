import { defineStore } from 'pinia'
import type { ExpensePolicyType, ExpenseEntryItemType, SupplierInvoiceType } from '@/modules/Contabilidad/PolizasDeGastos/types/expensePoliciesTypes'

const initialPolicy: ExpensePolicyType = {
    id: undefined,
    folio: '',
    date: new Date().toISOString().split('T')[0],
    supplier: '',
    concept: '',
    total: 0,
    expenseType: '',
    costCenter: '',
    paymentMethod: '',
    bankAccount: '',
    paymentReference: '',
    entries: []
}

const useExpensePoliciesStore = defineStore('expense-policies-store', {
    state: () => ({
        selectedPolicy: initialPolicy as ExpensePolicyType,
        modalId: 'expense-policy-modal',
        invoiceModalId: 'supplier-invoice-modal',
        showInvoiceModal: false
    }),
    actions: {
        setData(data: ExpensePolicyType = initialPolicy) {
            this.selectedPolicy = data
        },
        addEntry() {
            const newEntry: ExpenseEntryItemType = {
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
        updateEntry(id: string, field: keyof ExpenseEntryItemType, value: any) {
            const entry = this.selectedPolicy.entries.find(e => e.id === id)
            if (entry) {
                (entry as any)[field] = value
            }
        },
        linkSupplierInvoice(invoice: SupplierInvoiceType) {
            // Auto-generate suggested entries for expense
            const suggestedEntries: ExpenseEntryItemType[] = [
                {
                    id: `P-${Date.now()}-1`,
                    account: '601-001 Gastos de Operación',
                    description: 'Cargo por ' + invoice.concept,
                    debit: invoice.amount * 0.86,
                    credit: 0,
                    reference: invoice.folio
                },
                {
                    id: `P-${Date.now()}-2`,
                    account: '119-001 IVA Acreditable',
                    description: 'IVA acreditable',
                    debit: invoice.amount * 0.14,
                    credit: 0,
                    reference: invoice.folio
                },
                {
                    id: `P-${Date.now()}-3`,
                    account: '102-001 Bancos',
                    description: 'Abono a banco por pago',
                    debit: 0,
                    credit: invoice.amount,
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

export default useExpensePoliciesStore
