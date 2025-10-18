import { z } from 'zod'

export const contractSchema = z.object({
    name: z
        .string({ required_error: 'El nombre es requerido' })
        .min(5, 'Mínimo 5 caracteres'),
    counterpart: z
        .string({ required_error: 'La contraparte es requerida' })
        .min(3, 'Mínimo 3 caracteres'),
    type: z
        .string({ required_error: 'El tipo es requerido' })
        .min(1, 'Seleccione un tipo'),
    startDate: z
        .string({ required_error: 'La fecha de inicio es requerida' })
        .min(1, 'Seleccione una fecha'),
    expirationDate: z
        .string({ required_error: 'La fecha de vencimiento es requerida' })
        .min(1, 'Seleccione una fecha'),
    amount: z
        .number({ required_error: 'El monto es requerido' })
        .positive('El monto debe ser mayor a 0')
        .min(1, 'El monto debe ser mayor a 0'),
    description: z
        .string()
        .optional()
}).refine((data) => {
    const start = new Date(data.startDate)
    const end = new Date(data.expirationDate)
    return end > start
}, {
    message: 'La fecha de vencimiento debe ser posterior a la fecha de inicio',
    path: ['expirationDate']
})
