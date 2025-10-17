import { z } from 'zod'
import { stringValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createUpdateDepartmentSchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 2 caracteres', 2),
    description: optionalStringValidator('Mínimo 5 caracteres', 5),
    active: z.boolean()
})

