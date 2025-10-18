import { z } from 'zod'

export const budgetSchema = z.object({
    area: z
        .string({ required_error: 'El área es requerida' })
        .min(3, 'Mínimo 3 caracteres'),
    budgeted: z
        .number({ required_error: 'El monto presupuestado es requerido' })
        .positive('El monto debe ser mayor a 0'),
    fiscalYear: z
        .number({ required_error: 'El año fiscal es requerido' })
        .min(2020, 'Año fiscal inválido')
        .max(2100, 'Año fiscal inválido'),
    description: z
        .string()
        .optional()
})
