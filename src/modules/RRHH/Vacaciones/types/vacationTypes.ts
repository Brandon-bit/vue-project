// Backend types (Spanish)
export type Vacation = {
    id?: number
    empleadoId: number
    empleadoNombre: string
    fechaInicio: string
    fechaFin: string
    comentarios?: string
    estado: 'pendiente' | 'aprobada' | 'rechazada'
    fechaSolicitud: string
}

// Frontend types (English)
export type VacationDTO = {
    id?: number
    employeeId: number
    employeeName: string
    startDate: string
    endDate: string
    comments?: string
    status: 'pending' | 'approved' | 'rejected'
    requestDate: string
    statusLabel?: string
    daysCount?: number
}

// Form types
export type VacationFormDTO = {
    id?: number
    employeeId: number
    employeeName: string
    startDate: string
    endDate: string
    comments?: string
    status?: 'pending' | 'approved' | 'rejected'
}

export type VacationForm = {
    id?: number
    empleadoId: number
    empleadoNombre: string
    fechaInicio: string
    fechaFin: string
    comentarios?: string
    estado?: 'pendiente' | 'aprobada' | 'rechazada'
}
