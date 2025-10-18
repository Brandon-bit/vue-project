export type PermissionStatus = 'Pendiente' | 'Aprobado' | 'Rechazado'

export type PermissionTypeId = 'vehiculo' | 'equipo' | 'sala' | 'ausencia'

export type PermissionTypeInfo = {
    id: PermissionTypeId
    name: string
    icon: string
    color: string
    description: string
}

export type PermissionType = {
    id?: number
    type: string
    resource: string
    applicant: string
    startDate: Date
    endDate: Date
    status: PermissionStatus
    reason: string
}

export type PermissionResponseType = {
    id: number
    tipo: string
    recurso: string
    solicitante: string
    fechaInicio: Date
    fechaFin: Date
    estado: PermissionStatus
    motivo: string
    activo: boolean
    eliminado: boolean
}

export type PermissionFormType = {
    permissionType: PermissionTypeId
    resource: string
    startDate: string
    endDate: string
    reason: string
}

export type PermissionStatsType = {
    active: number
    pending: number
    approvedToday: number
    availableResources: number
}

export type TabType = 'my-requests' | 'approvals' | 'calendar'
