import { z } from 'zod'

export const identitySchema = z.object({
    mission: z.string().min(10, 'La misión debe tener al menos 10 caracteres'),
    vision: z.string().min(10, 'La visión debe tener al menos 10 caracteres'),
    values: z.string().min(5, 'Los valores deben tener al menos 5 caracteres')
})

export const objectiveSchema = z.object({
    name: z.string().min(5, 'El nombre debe tener al menos 5 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    specific: z.boolean(),
    measurable: z.boolean(),
    achievable: z.boolean(),
    relevant: z.boolean(),
    timeBound: z.boolean(),
    perspective: z.string().min(1, 'La perspectiva es requerida'),
    kpi: z.string().min(1, 'El KPI es requerido'),
    target: z.string().min(1, 'La meta es requerida'),
    deadline: z.string().min(1, 'El plazo es requerido')
}).refine(
    (data) => {
        const smartScore = [
            data.specific,
            data.measurable,
            data.achievable,
            data.relevant,
            data.timeBound
        ].filter(Boolean).length
        return smartScore === 5
    },
    {
        message: 'El objetivo debe cumplir con todos los criterios SMART',
        path: ['specific']
    }
)
