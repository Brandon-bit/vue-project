import { z } from 'zod'
import { stringValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createUpdatePayrollPeriodSchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 3 caracteres', 3),
    type: z.enum(['semanal', 'quincenal', 'mensual'], {
        required_error: 'El tipo de período es requerido'
    }),
    startDate: z.string().min(1, 'La fecha de inicio es requerida'),
    endDate: z.string().min(1, 'La fecha de fin es requerida'),
    status: z.enum(['borrador', 'calculada', 'pagada', 'cerrada'], {
        required_error: 'El estado es requerido'
    }),
    payrollType: z.enum(['ordinaria', 'extraordinaria'], {
        required_error: 'El tipo de nómina es requerido'
    }),
    notes: optionalStringValidator('Mínimo 5 caracteres', 5),
    active: z.boolean()
}).refine(
    (data) => {
        // Validar que la fecha de fin sea posterior a la fecha de inicio
        const start = new Date(data.startDate)
        const end = new Date(data.endDate)
        return end >= start
    },
    {
        message: 'La fecha de fin debe ser posterior o igual a la fecha de inicio',
        path: ['endDate']
    }
)

export const deletePayrollPeriodSchema = z.object({})
