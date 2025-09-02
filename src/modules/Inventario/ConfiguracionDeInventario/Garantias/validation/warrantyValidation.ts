import { z } from 'zod'

export const createWarrantySchema = z.object({
    name: z
        .string()
        .nonempty('El campo nombre es requerido.'),
    duration: z
        .number()
        .min(1, 'La duración debe ser al menos de 1.'),
    period: z
        .enum(['month', 'year'], {
            errorMap: () => ({ message: 'El periodo debe ser "month" o "year".' })
        }),
    description: z
        .string()
        .min(10, 'La descripción debe tener al menos 10 caracteres.'),
    active: z
        .boolean(),
});