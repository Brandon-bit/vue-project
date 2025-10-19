import { z } from 'zod'

export const initiativeSchema = z.object({
    name: z.string().min(5, 'El nombre debe tener al menos 5 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    objective: z.string().min(5, 'El objetivo es requerido'),
    leader: z.string().min(3, 'El líder es requerido'),
    startDate: z.string().min(1, 'La fecha de inicio es requerida'),
    endDate: z.string().min(1, 'La fecha de fin es requerida'),
    budget: z.string().min(1, 'El presupuesto es requerido'),
    status: z.string().min(1, 'El estado es requerido')
})

export const projectSchema = z.object({
    name: z.string().min(5, 'El nombre debe tener al menos 5 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    objective: z.string().min(5, 'El objetivo es requerido'),
    leader: z.string().min(3, 'El project manager es requerido'),
    startDate: z.string().min(1, 'La fecha de inicio es requerida'),
    endDate: z.string().min(1, 'La fecha de cierre es requerida'),
    budget: z.string().min(1, 'El presupuesto es requerido')
})
