import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SWOTItem, PESTELItem, Risk } from '../types/diagnosticTypes'

export const useDiagnosticStore = defineStore('diagnostic', () => {
    // Modal IDs
    const swotModalId = 'swot-modal'
    const pestelModalId = 'pestel-modal'
    const riskModalId = 'risk-modal'

    // Selected items
    const selectedSWOT = ref<SWOTItem | null>(null)
    const selectedPESTEL = ref<PESTELItem | null>(null)
    const selectedRisk = ref<Risk | null>(null)

    // Actions
    const setSWOTData = (data: SWOTItem | null = null) => {
        selectedSWOT.value = data
    }

    const setPESTELData = (data: PESTELItem | null = null) => {
        selectedPESTEL.value = data
    }

    const setRiskData = (data: Risk | null = null) => {
        selectedRisk.value = data
    }

    return {
        // Modal IDs
        swotModalId,
        pestelModalId,
        riskModalId,
        
        // Selected items
        selectedSWOT,
        selectedPESTEL,
        selectedRisk,
        
        // Actions
        setSWOTData,
        setPESTELData,
        setRiskData
    }
})

export default useDiagnosticStore
