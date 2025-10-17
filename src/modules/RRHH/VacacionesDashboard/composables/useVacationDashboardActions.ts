import { VacationStats, VacationStatsDTO } from '@rrhh/VacacionesDashboard/types/vacationDashboardTypes'
import { mapVacationStatsDTO } from '@rrhh/VacacionesDashboard/composables/mappingVacationDashboard'

// Mock data for vacation statistics
const mockVacationStats: VacationStatsDTO = {
    totalEmpleados: 8,
    enVacaciones: 1,
    solicitudesPendientes: 2,
    aprobadasEsteMes: 3,
    rechazadasEsteMes: 1,
    promedioDiasPorEmpleado: 7.5,
    diasTotalesUsados: 45,
    diasTotalesDisponibles: 120
}

export const useVacationDashboardActions = () => {
    const getVacationStats = async (): Promise<VacationStats> => {
        console.log('Fetching vacation statistics')

        // TODO: Implement axios call
        // const response = await axiosInstance.get('/vacations/stats')
        // return mapVacationStatsDTO(response.data)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        return mapVacationStatsDTO(mockVacationStats)
    }

    return {
        getVacationStats
    }
}
