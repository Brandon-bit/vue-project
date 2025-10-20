// Backend response type (español)
export type PayrollPeriod = {
    id?: number
    nombre: string
    tipo: 'semanal' | 'quincenal' | 'mensual'
    fechaInicio: string
    fechaFin: string
    estado: 'borrador' | 'calculada' | 'pagada' | 'cerrada'
    estadoId: number // 1=borrador, 2=calculada, 3=pagada, 4=cerrada
    tipoNomina: 'ordinaria' | 'extraordinaria'
    observaciones?: string
    totalPercepciones?: number
    totalDeducciones?: number
    totalNeto?: number
    activo: boolean
}

// Frontend DTO type (inglés)
export type PayrollPeriodDTO = {
    id?: number
    name: string
    type: 'semanal' | 'quincenal' | 'mensual'
    startDate: string
    endDate: string
    status: 'borrador' | 'calculada' | 'pagada' | 'cerrada'
    statusId: number // 1=borrador, 2=calculada, 3=pagada, 4=cerrada
    payrollType: 'ordinaria' | 'extraordinaria'
    notes?: string
    totalPerceptions?: number
    totalDeductions?: number
    totalNet?: number
    active: boolean
}

// Form type for create/update
export type PayrollPeriodFormDTO = {
    id?: number
    name: string
    type: 'semanal' | 'quincenal' | 'mensual'
    startDate: string
    endDate: string
    status: 'borrador' | 'calculada' | 'pagada' | 'cerrada'
    payrollType: 'ordinaria' | 'extraordinaria'
    notes?: string
    active: boolean
}

// Request type to backend
export type PayrollPeriodRequest = {
    id?: number
    nombre: string
    tipo: 'semanal' | 'quincenal' | 'mensual'
    fechaInicio: string
    fechaFin: string
    estado: 'borrador' | 'calculada' | 'pagada' | 'cerrada'
    tipoNomina: 'ordinaria' | 'extraordinaria'
    observaciones?: string
    activo: boolean
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number
    label: string
}
