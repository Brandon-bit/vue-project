import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
    // Refresh state
    const lastUpdate = ref<Date>(new Date())
    const isRefreshing = ref(false)

    // Actions
    const updateLastRefresh = () => {
        lastUpdate.value = new Date()
    }

    const setRefreshing = (value: boolean) => {
        isRefreshing.value = value
    }

    const refreshDashboard = async () => {
        setRefreshing(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            updateLastRefresh()
        } finally {
            setRefreshing(false)
        }
    }

    return {
        // State
        lastUpdate,
        isRefreshing,
        
        // Actions
        updateLastRefresh,
        setRefreshing,
        refreshDashboard
    }
})

export default useDashboardStore
