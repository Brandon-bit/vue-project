import { defineStore } from 'pinia'
import type { DepreciableAssetType, DepreciationMethodType } from '@/modules/Contabilidad/Depreciacion/types/depreciationTypes'

const useDepreciationStore = defineStore('depreciation-store', {
    state: () => ({
        selectedMonth: '03',
        selectedYear: '2024',
        depreciationMethod: 'linea-recta' as DepreciationMethodType,
        calculationPerformed: false,
        policyGenerated: false,
        generatedPolicyFolio: '',
        depreciableAssets: [] as DepreciableAssetType[]
    }),
    actions: {
        setMonth(month: string) {
            this.selectedMonth = month
        },
        setYear(year: string) {
            this.selectedYear = year
        },
        setMethod(method: DepreciationMethodType) {
            this.depreciationMethod = method
        },
        setCalculationPerformed(value: boolean) {
            this.calculationPerformed = value
        },
        setPolicyGenerated(value: boolean, folio?: string) {
            this.policyGenerated = value
            if (folio) {
                this.generatedPolicyFolio = folio
            }
        },
        setDepreciableAssets(assets: DepreciableAssetType[]) {
            this.depreciableAssets = assets
        },
        resetCalculation() {
            this.calculationPerformed = false
            this.policyGenerated = false
            this.generatedPolicyFolio = ''
            this.depreciableAssets = []
        }
    },
    getters: {
        totalMonthlyDepreciation: (state) => {
            return state.depreciableAssets.reduce((sum, asset) => sum + asset.monthlyDepreciation, 0)
        },
        totalAssets: (state) => {
            return state.depreciableAssets.length
        },
        periodLabel: (state) => {
            const months = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ]
            const monthIndex = parseInt(state.selectedMonth) - 1
            return `${months[monthIndex]} ${state.selectedYear}`
        }
    }
})

export default useDepreciationStore
