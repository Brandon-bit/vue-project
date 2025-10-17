import { VacationStats, VacationStatsDTO } from '@rrhh/VacacionesDashboard/types/vacationDashboardTypes'

export const mapVacationStatsDTO = (data: VacationStatsDTO): VacationStats => ({
    totalEmployees: data.totalEmpleados,
    onVacation: data.enVacaciones,
    pendingRequests: data.solicitudesPendientes,
    approvedThisMonth: data.aprobadasEsteMes,
    rejectedThisMonth: data.rechazadasEsteMes,
    averageDaysPerEmployee: data.promedioDiasPorEmpleado,
    totalDaysUsed: data.diasTotalesUsados,
    totalDaysAvailable: data.diasTotalesDisponibles
})
