import { z } from 'zod'
import { stringValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createUpdatePayrollConceptSchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 3 caracteres', 3),
    code: stringValidator('El campo clave es requerido', 'Mínimo 2 caracteres', 2),
    type: z.enum(['percepcion', 'deduccion'], {
        required_error: 'El tipo de concepto es requerido'
    }),
    description: optionalStringValidator('Mínimo 5 caracteres', 5),
    isVariable: z.boolean(),
    fixedAmount: z.number().min(0, 'El monto debe ser mayor o igual a 0').optional().nullable(),
    percentage: z.number().min(0, 'El porcentaje debe ser mayor o igual a 0').max(100, 'El porcentaje no puede ser mayor a 100').optional().nullable(),
    appliesISR: z.boolean(),
    appliesIMSS: z.boolean(),
    active: z.boolean()
}).refine(
    (data) => {
        // Si no es variable, debe tener monto fijo o porcentaje
        if (!data.isVariable) {
            return (data.fixedAmount !== null && data.fixedAmount !== undefined) || 
                   (data.percentage !== null && data.percentage !== undefined)
        }
        return true
    },
    {
        message: 'Para conceptos fijos, debe especificar un monto fijo o porcentaje',
        path: ['fixedAmount']
    }
)

export const deletePayrollConceptSchema = z.object({})
