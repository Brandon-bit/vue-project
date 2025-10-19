import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Objective } from '../types/strategyTypes'

export const useStrategyStore = defineStore('strategy', () => {
    // Modal IDs
    const objectiveModalId = 'objective-modal'

    // Selected items
    const selectedObjective = ref<Objective | null>(null)

    // Editing state
    const isEditingIdentity = ref(false)

    // Actions
    const setObjectiveData = (data: Objective | null = null) => {
        selectedObjective.value = data
    }

    const setEditingIdentity = (value: boolean) => {
        isEditingIdentity.value = value
    }

    return {
        // Modal IDs
        objectiveModalId,
        
        // Selected items
        selectedObjective,
        
        // Editing state
        isEditingIdentity,
        
        // Actions
        setObjectiveData,
        setEditingIdentity
    }
})

export default useStrategyStore
