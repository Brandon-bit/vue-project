import { z } from 'zod'
import { stringValidator, selectValidator } from '@/shared/validations/globalValidation'

export const positionSchema = z.object({
    departmentId: selectValidator('El departamento es requerido'),
    name: stringValidator(
        'El nombre del puesto es requerido',
        'El nombre debe tener al menos 3 caracteres',
        3
    ),
    description: stringValidator(
        'La descripción es requerida',
        'La descripción debe tener al menos 10 caracteres',
        10
    ),
    active: z.boolean({
        required_error: 'El campo es obligatorio',
        invalid_type_error: 'Asegúrate de elegir un estado correcto'
    })
})

export type PositionSchemaType = z.infer<typeof positionSchema>
