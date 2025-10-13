import { z } from 'zod'
import { numberValidator, stringValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createUpdateMaxMinSchema = z.object({
    productId: numberValidator(
        'El campo producto id es requerido',
        true,
        'El campo producto id es requerido'
    ),
    productName: stringValidator('El campo  producto es requerido', 'Mínimo 1 caracter', 1),
    maximum: numberValidator('El campo máximo es requerido'),
    minimum: numberValidator('El campo mínimo es requerido'),
    reorderPoints: numberValidator('El campo puntos de reorden es requerido'),
    suggestion: optionalStringValidator('Mínimo 10 caracteres', 10)
})

export const deleteMaxMinSchema = z.object({})
