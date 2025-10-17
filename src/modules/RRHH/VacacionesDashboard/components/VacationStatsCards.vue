<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useVacationDashboardActions } from '@rrhh/VacacionesDashboard/composables/useVacationDashboardActions'
import { VacationStats } from '@rrhh/VacacionesDashboard/types/vacationDashboardTypes'
import StatCard from '@rrhh/VacacionesDashboard/components/StatCard.vue'

const { getVacationStats } = useVacationDashboardActions()
const stats = ref<VacationStats>({
    totalEmployees: 0,
    onVacation: 0,
    pendingRequests: 0,
    approvedThisMonth: 0,
    rejectedThisMonth: 0,
    averageDaysPerEmployee: 0,
    totalDaysUsed: 0,
    totalDaysAvailable: 0
})

const vacationPercentage = computed(() => {
    if (stats.value.totalEmployees === 0) return '0.0'
    return ((stats.value.onVacation / stats.value.totalEmployees) * 100).toFixed(1)
})

const usagePercentage = computed(() => {
    if (stats.value.totalDaysAvailable === 0) return '0.0'
    return ((stats.value.totalDaysUsed / stats.value.totalDaysAvailable) * 100).toFixed(1)
})

onMounted(async () => {
    stats.value = await getVacationStats()
})
</script>

<template>
    <div class="grid gap-6 md:grid-cols-4 mb-10">
        <StatCard
            icon="beach_access"
            color="warning"
            title="De Vacaciones"
            :value="stats.onVacation"
            :description="`${vacationPercentage}% de la plantilla`"
        />
        <StatCard
            icon="pending_actions"
            color="info"
            title="Solicitudes Pendientes"
            :value="stats.pendingRequests"
            description="Por aprobar o rechazar"
        />
        <StatCard
            icon="check_circle"
            color="success"
            title="Aprobadas Este Mes"
            :value="stats.approvedThisMonth"
            description="Vacaciones autorizadas"
        />
        <StatCard
            icon="calendar_month"
            color="primary"
            title="Promedio de Días"
            :value="stats.averageDaysPerEmployee"
            description="Por empleado este año"
        />
    </div>

    <!-- Segunda fila de estadísticas -->
    <div class="grid gap-6 md:grid-cols-3 mb-10">
        <StatCard
            icon="event_available"
            color="secondary"
            title="Días Totales Usados"
            :value="stats.totalDaysUsed"
            :description="`${usagePercentage}% del total disponible`"
        />
        <StatCard
            icon="event_note"
            color="accent"
            title="Días Disponibles"
            :value="stats.totalDaysAvailable"
            description="Total en el año"
        />
        <StatCard
            icon="cancel"
            color="error"
            title="Rechazadas Este Mes"
            :value="stats.rejectedThisMonth"
            description="Solicitudes denegadas"
        />
    </div>
</template>
