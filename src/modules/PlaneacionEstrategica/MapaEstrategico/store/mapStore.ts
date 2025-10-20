import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StrategicObjective } from '../types/mapTypes'

export const useMapStore = defineStore('strategicMap', () => {
    // Selected objective for drawer
    const selectedObjective = ref<StrategicObjective | null>(null)
    
    // Drawer state
    const isDrawerOpen = ref(false)

    // Actions
    const setSelectedObjective = (objective: StrategicObjective | null) => {
        selectedObjective.value = objective
    }

    const openDrawer = (objective: StrategicObjective) => {
        selectedObjective.value = objective
        isDrawerOpen.value = true
    }

    const closeDrawer = () => {
        isDrawerOpen.value = false
        // Keep selected objective for a moment to allow animation
        setTimeout(() => {
            selectedObjective.value = null
        }, 300)
    }

    return {
        // State
        selectedObjective,
        isDrawerOpen,
        
        // Actions
        setSelectedObjective,
        openDrawer,
        closeDrawer
    }
})

export default useMapStore
