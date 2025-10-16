import { z } from 'zod'

export const journalBookFiltersSchema = z.object({
    month: z
        .string({ required_error: 'El mes es requerido' })
        .min(1, 'Debe seleccionar un mes'),
    year: z
        .string({ required_error: 'El año es requerido' })
        .min(1, 'Debe seleccionar un año'),
    policyType: z
        .string()
        .optional()
})
