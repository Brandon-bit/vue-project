import {
    Vacation,
    VacationDTO,
    VacationForm,
    VacationFormDTO
} from '@rrhh/Vacaciones/types/vacationTypes'

const statusMap: Record<string, string> = {
    pending: 'Pendiente',
    approved: 'Aprobada',
    rejected: 'Rechazada',
    pendiente: 'Pendiente',
    aprobada: 'Aprobada',
    rechazada: 'Rechazada'
}

const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1 // Include both start and end date
}

export const mapVacationDTO = (data: Vacation): VacationDTO => ({
    id: data.id,
    employeeId: data.empleadoId,
    employeeName: data.empleadoNombre,
    startDate: data.fechaInicio,
    endDate: data.fechaFin,
    comments: data.comentarios,
    status: data.estado === 'pendiente' ? 'pending' : data.estado === 'aprobada' ? 'approved' : 'rejected',
    requestDate: data.fechaSolicitud,
    statusLabel: statusMap[data.estado] || data.estado,
    daysCount: calculateDays(data.fechaInicio, data.fechaFin)
})

export const mapVacationRequest = (data: VacationFormDTO): VacationForm => ({
    id: data.id,
    empleadoId: data.employeeId,
    empleadoNombre: data.employeeName,
    fechaInicio: data.startDate,
    fechaFin: data.endDate,
    comentarios: data.comments,
    estado: data.status === 'pending' ? 'pendiente' : data.status === 'approved' ? 'aprobada' : data.status === 'rejected' ? 'rechazada' : undefined
})

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}
