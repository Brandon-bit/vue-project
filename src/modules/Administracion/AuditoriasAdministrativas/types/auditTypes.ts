// Enums y tipos base
export type AuditStatus = 'Planificada' | 'En Ejecución' | 'En Revisión' | 'Cerrada'
export type AuditType = 'Fiscal' | 'Operativa' | 'Cumplimiento' | 'Calidad'
export type FindingSeverity = 'Alta' | 'Media' | 'Baja'
export type FindingStatus = 'Pendiente' | 'En Proceso' | 'Completado'

// Tipo para auditoría
export type Audit = {
    id: number
    nombre: string
    tipo: AuditType
    area: string
    auditor: string
    fechaInicio: string
    fechaFin: string
    estado: AuditStatus
    hallazgos: number
    progreso: number
    objetivo: string
    activo: boolean
    eliminado: boolean
}

// Tipo para formulario de auditoría
export type AuditFormType = {
    nombre: string
    tipo: AuditType
    area: string
    auditor: string
    fechaInicio: string
    fechaFin: string
    objetivo: string
    activo: boolean
}

// Tipo para hallazgo
export type Finding = {
    id: number
    auditoriaId: number
    auditoriaNombre: string
    severidad: FindingSeverity
    descripcion: string
    responsable: string
    fechaLimite: string
    estado: FindingStatus
    activo: boolean
    eliminado: boolean
}

// Tipo para formulario de hallazgo
export type FindingFormType = {
    auditoriaId: number
    severidad: FindingSeverity
    descripcion: string
    responsable: string
    fechaLimite: string
    estado: FindingStatus
}

// Tipo para item de checklist
export type ChecklistItem = {
    id: number
    auditoriaId: number
    categoria: string
    item: string
    cumple: boolean
}

// Tipo para estadísticas
export type AuditStats = {
    activas: number
    hallazgosAbiertos: number
    tareasCorrectivas: number
    completadasAnio: number
}
