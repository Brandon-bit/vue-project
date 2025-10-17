import { z } from 'zod'

export const createUpdatePayrollDetailSchema = z.object({
    payrollPeriodId: z.number().min(1, 'El período de nómina es requerido'),
    employeeId: z.number().min(1, 'El empleado es requerido'),
    conceptId: z.number().min(1, 'El concepto es requerido'),
    amount: z.number().min(0, 'El monto debe ser mayor o igual a 0'),
    type: z.enum(['percepcion', 'deduccion'], {
        required_error: 'El tipo es requerido'
    }),
    notes: z.string().optional()
})

export const deletePayrollDetailSchema = z.object({})

export const addEmployeeToPayrollSchema = z.object({
    payrollPeriodId: z.number().min(1, 'El período de nómina es requerido'),
    employeeId: z.number().min(1, 'El empleado es requerido')
})
