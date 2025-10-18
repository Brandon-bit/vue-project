import { z } from 'zod'

export const expenseSchema = z.object({
    concept: z
        .string({ required_error: 'El concepto es requerido' })
        .min(5, 'Mínimo 5 caracteres'),
    date: z
        .string({ required_error: 'La fecha es requerida' })
        .min(1, 'Seleccione una fecha'),
    amount: z
        .number({ required_error: 'El monto es requerido' })
        .positive('El monto debe ser mayor a 0')
        .min(1, 'El monto debe ser mayor a 0'),
    category: z
        .string({ required_error: 'La categoría es requerida' })
        .min(1, 'Seleccione una categoría'),
    description: z
        .string()
        .optional()
})
