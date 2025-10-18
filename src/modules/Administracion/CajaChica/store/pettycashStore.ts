import { defineStore } from 'pinia'
import type { ExpenseType, TabType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'

const initialExpense: ExpenseType = {
    id: undefined,
    pettyBoxId: 0,
    pettyBoxName: '',
    date: new Date(),
    concept: '',
    amount: 0,
    responsible: '',
    costCenter: '',
    description: '',
    status: 'Pendiente',
    receiptUrl: '',
    creationDate: new Date()
}

const usePettyCashStore = defineStore('pettycash-store', {
    state: () => ({
        selectedExpense: initialExpense as ExpenseType,
        modalId: 'pettycash-modal',
        activeTab: 'expenses' as TabType
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

export default usePettyCashStore
