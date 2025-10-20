import { z } from 'zod'
import { selectValidator, numberValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createUpdatePayrollDetailSchema = z.object({
    conceptId: selectValidator('El concepto es requerido'),
    amount: numberValidator('El monto es requerido', true, 'El monto debe ser mayor o igual a 0').refine(
        (val) => val >= 0,
        { message: 'El monto debe ser mayor o igual a 0' }
    ),
    type: z.enum(['percepcion', 'deduccion'], {
        required_error: 'El tipo es requerido'
    }),
    notes: optionalStringValidator('Las notas deben tener al menos 3 caracteres', 3)
})

export const deletePayrollDetailSchema = z.object({})

export const addEmployeeToPayrollSchema = z.object({
    payrollPeriodId: selectValidator('El período de nómina es requerido'),
    employeeId: selectValidator('El empleado es requerido')
})

export const importPayrollSchema = z.object({
    csvFile: z
        .array(z.instanceof(File))
        .min(1, 'Debes seleccionar un archivo CSV')
        .refine(
            (files) => files.every(file => file.name.endsWith('.csv')),
            { message: 'El archivo debe ser un CSV válido' }
        )
})

export const payrollDispersionSchema = z.object({
    selectedBank: selectValidator('Debes seleccionar un banco')
})
