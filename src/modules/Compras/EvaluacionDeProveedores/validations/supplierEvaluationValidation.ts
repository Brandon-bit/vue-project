import { z } from 'zod'

export const incidentSchema = z.object({
    supplierId: z.number(),
    purchaseOrder: z
        .string({ required_error: 'La orden de compra es requerida' })
        .min(1, 'La orden de compra es requerida'),
    incidentType: z
        .string({ required_error: 'El tipo de incidencia es requerido' })
        .min(1, 'El tipo de incidencia es requerido'),
    description: z
        .string({ required_error: 'La descripción es requerida' })
        .min(10, 'La descripción debe tener al menos 10 caracteres'),
    impact: z
        .string({ required_error: 'El impacto es requerido' })
        .min(1, 'El impacto es requerido')
})
