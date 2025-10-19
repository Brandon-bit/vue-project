import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Initiative } from '../types/initiativeTypes'

export const useInitiativeStore = defineStore('initiative', () => {
    // Modal IDs
    const initiativeModalId = 'initiative-modal'
    const convertModalId = 'convert-modal'

    // Selected items
    const selectedInitiative = ref<Initiative | null>(null)

    // Actions
    const setInitiativeData = (data: Initiative | null = null) => {
        selectedInitiative.value = data
    }

    return {
        // Modal IDs
        initiativeModalId,
        convertModalId,
        
        // Selected items
        selectedInitiative,
        
        // Actions
        setInitiativeData
    }
})

export default useInitiativeStore
