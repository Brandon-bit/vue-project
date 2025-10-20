import { ref } from 'vue'
import { dashboardService } from '../services/dashboardService'
import type { BSCObjective, KeyInitiative, StrategicProject, FinancialKPI, ActiveRisk } from '../types/dashboardTypes'

export const useDashboardData = () => {
    const bscObjectives = ref<BSCObjective[]>([])
    const keyInitiatives = ref<KeyInitiative[]>([])
    const strategicProjects = ref<StrategicProject[]>([])
    const financialKPIs = ref<FinancialKPI[]>([])
    const activeRisks = ref<ActiveRisk[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const loadDashboardData = async () => {
        isLoading.value = true
        error.value = null
        
        try {
            const data = await dashboardService.getDashboardData()
            bscObjectives.value = data.bscObjectives
            keyInitiatives.value = data.keyInitiatives
            strategicProjects.value = data.strategicProjects
            financialKPIs.value = data.financialKPIs
            activeRisks.value = data.activeRisks
        } catch (err) {
            error.value = 'Error al cargar los datos del dashboard'
            console.error('Error loading dashboard data:', err)
        } finally {
            isLoading.value = false
        }
    }

    const refreshData = async () => {
        await loadDashboardData()
    }

    return {
        // State
        bscObjectives,
        keyInitiatives,
        strategicProjects,
        financialKPIs,
        activeRisks,
        isLoading,
        error,
        
        // Actions
        loadDashboardData,
        refreshData
    }
}
