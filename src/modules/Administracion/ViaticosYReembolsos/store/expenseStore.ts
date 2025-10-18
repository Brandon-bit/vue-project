import { defineStore } from 'pinia'
import type { ExpenseType, TabType } from '@/modules/Administracion/ViaticosYReembolsos/types/expenseTypes'

const initialExpense: ExpenseType = {
    id: undefined,
    concept: '',
    date: new Date(),
    amount: 0,
    status: 'pendiente',
    verified: false,
    employee: '',
    description: '',
    category: ''
}

const useExpenseStore = defineStore('expense-store', {
    state: () => ({
        selectedExpense: initialExpense as ExpenseType,
        modalId: 'expense-modal',
        activeTab: 'my-requests' as TabType
    }),
    actions: {
        setData(data: ExpenseType = initialExpense) {
            this.selectedExpense = data
        },
        setActiveTab(tab: TabType) {
            this.activeTab = tab
        }
    }
})

export default useExpenseStore
