import {
    PayrollDetail,
    PayrollDetailDTO,
    PayrollDetailFormDTO,
    PayrollDetailRequest
} from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'

// Map backend response to frontend DTO
export const mapPayrollDetailDTO = (data: PayrollDetail): PayrollDetailDTO => ({
    id: data.id,
    payrollPeriodId: data.periodoNomina,
    employeeId: data.empleado,
    conceptId: data.concepto,
    amount: data.monto,
    type: data.tipo,
    notes: data.observaciones
})

// Map frontend form to backend request
export const mapPayrollDetailRequest = (data: PayrollDetailFormDTO): PayrollDetailRequest => ({
    id: data.id,
    periodoNomina: data.payrollPeriodId,
    empleado: data.employeeId,
    concepto: data.conceptId,
    monto: data.amount,
    tipo: data.type,
    observaciones: data.notes
})
