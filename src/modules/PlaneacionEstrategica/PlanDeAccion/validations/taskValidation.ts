import { z } from 'zod'

export const taskSchema = z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    initiative: z.string().min(3, 'La iniciativa es requerida'),
    responsible: z.string().min(3, 'El responsable es requerido'),
    startDate: z.string().min(1, 'La fecha de inicio es requerida'),
    endDate: z.string().min(1, 'La fecha de fin es requerida'),
    priority: z.string().min(1, 'La prioridad es requerida')
})
