import { z } from 'zod'
import { stringValidator, selectValidator } from '@/shared/validations/globalValidation'

export const branchSchema = z.object({
    companyId: selectValidator('La empresa es requerida'),
    name: stringValidator(
        'El nombre de la sucursal es requerido',
        'El nombre debe tener al menos 3 caracteres',
        3
    ),
    address: stringValidator(
        'La dirección es requerida',
        'La dirección debe tener al menos 10 caracteres',
        10
    ),
    phone: stringValidator(
        'El teléfono es requerido',
        'El teléfono debe tener al menos 10 caracteres',
        10
    ).max(15, 'El teléfono no puede tener más de 15 caracteres'),
    active: z.boolean({
        required_error: 'El campo es obligatorio',
        invalid_type_error: 'Asegúrate de elegir un estado correcto'
    })
})

export type BranchSchemaType = z.infer<typeof branchSchema>
