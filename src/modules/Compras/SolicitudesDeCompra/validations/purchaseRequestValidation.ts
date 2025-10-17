import { z } from 'zod'

// Validación para paso 1: Información general
export const step1Schema = z.object({
    area: z.string().min(1, 'El área es requerida'),
    justificacion: z.string().min(10, 'La justificación debe tener al menos 10 caracteres')
})

// Validación para paso 2: Selección de productos (se valida en el store)
export const step2Schema = z.object({
    items: z.array(z.any()).min(1, 'Debes agregar al menos un producto')
})

// Schema completo de la solicitud
export const purchaseRequestSchema = z.object({
    area: z.string().min(1, 'El área es requerida'),
    justificacion: z.string().min(10, 'La justificación debe tener al menos 10 caracteres'),
    items: z.array(z.object({
        productoId: z.number(),
        codigo: z.string(),
        nombre: z.string(),
        cantidad: z.number().min(1, 'La cantidad debe ser mayor a 0'),
        precio: z.number(),
        subtotal: z.number()
    })).min(1, 'Debes agregar al menos un producto')
})

export type PurchaseRequestSchemaType = z.infer<typeof purchaseRequestSchema>
