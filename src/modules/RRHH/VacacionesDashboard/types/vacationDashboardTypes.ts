export interface VacationStats {
    totalEmployees: number
    onVacation: number
    pendingRequests: number
    approvedThisMonth: number
    rejectedThisMonth: number
    averageDaysPerEmployee: number
    totalDaysUsed: number
    totalDaysAvailable: number
}

export interface VacationStatsDTO {
    totalEmpleados: number
    enVacaciones: number
    solicitudesPendientes: number
    aprobadasEsteMes: number
    rechazadasEsteMes: number
    promedioDiasPorEmpleado: number
    diasTotalesUsados: number
    diasTotalesDisponibles: number
}
