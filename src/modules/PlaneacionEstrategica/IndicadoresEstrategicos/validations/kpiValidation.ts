import { z } from 'zod'

export const kpiSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    type: z.string().min(1, 'El tipo es requerido'),
    perspective: z.string().min(1, 'La perspectiva es requerida'),
    objective: z.string().min(5, 'El objetivo es requerido'),
    target: z.coerce.number().min(0.01, 'La meta debe ser mayor a 0'),
    unit: z.string().min(1, 'La unidad es requerida'),
    frequency: z.string().min(1, 'La frecuencia es requerida'),
    dataSource: z.string().min(3, 'La fuente de datos es requerida')
})
