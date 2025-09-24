import { z } from 'zod'
import { numberValidator, stringValidator } from '@/shared/validations/globalValidation'

export const createUpdateMaxMinSchema = z.object({
    maximum: numberValidator('El campo máximo es requerido'),
    minimum: numberValidator('El campo mínimo es requerido'),
    stock: numberValidator('El campo stock es requerido'),
    reorderPoints: numberValidator('El campo puntos de reorden es requerido'),
    suggestion: stringValidator('El campo sugerencia es requerido', 'Mínimo 10 caracteres', 10)
})
