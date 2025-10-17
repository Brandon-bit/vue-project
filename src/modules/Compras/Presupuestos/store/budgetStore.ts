import { defineStore } from 'pinia'
import type { BudgetType } from '@/modules/Compras/Presupuestos/types/budgetTypes'

const useBudgetStore = defineStore('budget-store', {
    state: () => ({
        modalId: 'budget-modal',
        selectedBudget: null as BudgetType | null
    }),
    actions: {
        setSelectedBudget(budget: BudgetType | null) {
            this.selectedBudget = budget
        },
        reset() {
            this.selectedBudget = null
        }
    }
})

export default useBudgetStore
