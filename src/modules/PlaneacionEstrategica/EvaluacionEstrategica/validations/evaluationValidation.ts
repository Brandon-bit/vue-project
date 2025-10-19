import { z } from 'zod'

export const lessonSchema = z.object({
    objective: z.string().min(5, 'El objetivo debe tener al menos 5 caracteres'),
    lesson: z.string().min(10, 'La lección debe tener al menos 10 caracteres'),
    type: z.string().min(1, 'El tipo es requerido'),
    impact: z.string().min(5, 'El impacto debe tener al menos 5 caracteres'),
    actions: z.string().min(5, 'Las acciones deben tener al menos 5 caracteres')
})

export const periodClosureSchema = z.object({
    period: z.string().min(1, 'El periodo es requerido'),
    highlightedAchievements: z.string().min(10, 'Los logros deben tener al menos 10 caracteres'),
    opportunityAreas: z.string().min(10, 'Las áreas de oportunidad deben tener al menos 10 caracteres'),
    recommendations: z.string().min(10, 'Las recomendaciones deben tener al menos 10 caracteres')
})
