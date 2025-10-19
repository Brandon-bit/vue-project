import { computed, type Ref } from 'vue'
import type { BSCObjective, KeyInitiative, StrategicProject, ActiveRisk } from '../types/dashboardTypes'

export const useDashboardMetrics = (
    bscObjectives: Ref<BSCObjective[]>,
    keyInitiatives: Ref<KeyInitiative[]>,
    strategicProjects: Ref<StrategicProject[]>,
    activeRisks: Ref<ActiveRisk[]>
) => {
    // BSC Average
    const bscAverage = computed(() => {
        if (bscObjectives.value.length === 0) return 0
        const sum = bscObjectives.value.reduce((acc, obj) => acc + obj.progress, 0)
        return Math.round(sum / bscObjectives.value.length)
    })

    // Total Budget
    const totalBudget = computed(() => {
        // In a real app, this would sum the actual budget values
        return '$4.2M'
    })

    // On Track Projects
    const onTrackProjects = computed(() => {
        return strategicProjects.value.filter(p => p.status === 'on-track').length
    })

    // Critical Risks
    const criticalRisks = computed(() => {
        return activeRisks.value.filter(r => r.severity === 'high').length
    })

    // Total Active Initiatives
    const totalInitiatives = computed(() => {
        return keyInitiatives.value.length
    })

    // Total Projects
    const totalProjects = computed(() => {
        return strategicProjects.value.length
    })

    // Average Initiative Progress
    const averageInitiativeProgress = computed(() => {
        if (keyInitiatives.value.length === 0) return 0
        const sum = keyInitiatives.value.reduce((acc, init) => acc + init.progress, 0)
        return Math.round(sum / keyInitiatives.value.length)
    })

    // Average Project Progress
    const averageProjectProgress = computed(() => {
        if (strategicProjects.value.length === 0) return 0
        const sum = strategicProjects.value.reduce((acc, proj) => acc + proj.progress, 0)
        return Math.round(sum / strategicProjects.value.length)
    })

    return {
        bscAverage,
        totalBudget,
        onTrackProjects,
        criticalRisks,
        totalInitiatives,
        totalProjects,
        averageInitiativeProgress,
        averageProjectProgress
    }
}
