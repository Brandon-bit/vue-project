import { z } from 'zod'

export const budgetSchema = z.object({
    area: z.string().min(1, 'El área es requerida'),
    proyecto: z.string().min(1, 'El proyecto es requerido'),
    periodo: z.string().min(1, 'El periodo es requerido'),
    asignado: z.number().min(1, 'El monto asignado debe ser mayor a 0')
})

export type BudgetSchemaType = z.infer<typeof budgetSchema>
