import { defineStore } from 'pinia'
import type { AccountingMovementType, SearchFiltersType } from '@/modules/Contabilidad/OperacionDeMovimientos/types/accountingMovementsTypes'

const useAccountingMovementsStore = defineStore('accounting-movements-store', {
    state: () => ({
        movements: [] as AccountingMovementType[],
        searchFilters: {
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            account: '',
            policyFolio: '',
            costCenter: '',
            sourceDocument: ''
        } as SearchFiltersType,
        showResults: false
    }),
    actions: {
        setMovements(movements: AccountingMovementType[]) {
            this.movements = movements
        },
        setSearchFilters(filters: Partial<SearchFiltersType>) {
            this.searchFilters = { ...this.searchFilters, ...filters }
        },
        setShowResults(value: boolean) {
            this.showResults = value
        },
        resetFilters() {
            this.searchFilters = {
                startDate: '2024-03-01',
                endDate: '2024-03-31',
                account: '',
                policyFolio: '',
                costCenter: '',
                sourceDocument: ''
            }
            this.movements = []
            this.showResults = false
        }
    },
    getters: {
        totalDebit: (state) => {
            return state.movements.reduce((sum, m) => sum + m.debit, 0)
        },
        totalCredit: (state) => {
            return state.movements.reduce((sum, m) => sum + m.credit, 0)
        },
        movementsCount: (state) => {
            return state.movements.length
        }
    }
})

export default useAccountingMovementsStore
