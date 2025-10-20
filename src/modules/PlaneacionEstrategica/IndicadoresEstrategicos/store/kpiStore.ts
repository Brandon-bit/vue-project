import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { KPI } from '../types/kpiTypes'

export const useKPIStore = defineStore('kpi', () => {
    // Modal IDs
    const kpiModalId = 'kpi-modal'

    // Selected items
    const selectedKPI = ref<KPI | null>(null)

    // Actions
    const setKPIData = (data: KPI | null = null) => {
        selectedKPI.value = data
    }

    return {
        // Modal IDs
        kpiModalId,
        
        // Selected items
        selectedKPI,
        
        // Actions
        setKPIData
    }
})

export default useKPIStore
