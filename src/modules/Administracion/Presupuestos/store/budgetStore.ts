import { defineStore } from 'pinia'
import type { BudgetType, FilterType } from '@/modules/Administracion/Presupuestos/types/budgetTypes'

const initialBudget: BudgetType = {
    id: undefined,
    area: '',
    budgeted: 0,
    spent: 0,
    percentage: 0,
    status: 'success',
    fiscalYear: new Date().getFullYear(),
    creationDate: new Date()
}

const useBudgetStore = defineStore('budget-store', {
    state: () => ({
        selectedBudget: initialBudget as BudgetType,
        modalId: 'budget-modal',
        filters: {
            fiscalYear: new Date().getFullYear(),
            area: 'todas'
        } as FilterType
    }),
    actions: {
        setData(data: BudgetType = initialBudget) {
            this.selectedBudget = data
        },
        setFilters(filters: Partial<FilterType>) {
            this.filters = { ...this.filters, ...filters }
        }
    }
})

export default useBudgetStore
