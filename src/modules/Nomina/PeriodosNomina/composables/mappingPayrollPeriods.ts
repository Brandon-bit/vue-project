import {
    PayrollPeriod,
    PayrollPeriodDTO,
    PayrollPeriodFormDTO,
    PayrollPeriodRequest,
    SelectOptionDTO
} from '@/modules/Nomina/PeriodosNomina/types/payrollPeriodTypes'

// Map backend response to frontend DTO
export const mapPayrollPeriodDTO = (data: PayrollPeriod): PayrollPeriodDTO => ({
    id: data.id,
    name: data.nombre,
    type: data.tipo,
    startDate: data.fechaInicio,
    endDate: data.fechaFin,
    status: data.estado,
    payrollType: data.tipoNomina,
    notes: data.observaciones,
    totalPerceptions: data.totalPercepciones,
    totalDeductions: data.totalDeducciones,
    totalNet: data.totalNeto,
    active: data.activo
})

// Map frontend form to backend request
export const mapPayrollPeriodRequest = (data: PayrollPeriodFormDTO): PayrollPeriodRequest => ({
    id: data.id,
    nombre: data.name,
    tipo: data.type,
    fechaInicio: data.startDate,
    fechaFin: data.endDate,
    estado: data.status,
    tipoNomina: data.payrollType,
    observaciones: data.notes,
    activo: data.active
})

// Map payroll period to select option
export const mapPayrollPeriodToSelectOption = (data: PayrollPeriodDTO): SelectOptionDTO => ({
    id: data.id!,
    label: `${data.name} (${data.startDate} - ${data.endDate})`
})
