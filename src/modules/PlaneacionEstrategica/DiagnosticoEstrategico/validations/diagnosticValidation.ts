import { z } from 'zod'

export const swotSchema = z.object({
    category: z.string().min(1, 'La categoría es requerida'),
    text: z.string().min(1, 'La descripción es requerida')
})

export const pestelSchema = z.object({
    category: z.string().min(1, 'La categoría es requerida'),
    factor: z.string().min(1, 'El factor es requerido'),
    impact: z.coerce.number().min(1, 'El impacto mínimo es 1').max(10, 'El impacto máximo es 10'),
    trend: z.string().min(1, 'La tendencia es requerida')
})

export const riskSchema = z.object({
    name: z.string().min(1, 'El nombre del riesgo es requerido'),
    probability: z.coerce.number().min(1, 'La probabilidad mínima es 1').max(10, 'La probabilidad máxima es 10'),
    impact: z.coerce.number().min(1, 'El impacto mínimo es 1').max(10, 'El impacto máximo es 10'),
    strategy: z.string().min(1, 'La estrategia es requerida')
})
