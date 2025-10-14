import { z } from 'zod'
import {
    stringValidator,
    dateValidator,
    selectValidator
} from '@/shared/validations/globalValidation'

export const createUpdateOrderManagementSchema = z.object({
    date: dateValidator('El campo fecha es requerido'),
    supplierId: selectValidator('El campo proveedor es requerido'),
    folio: stringValidator('El campo  folio es requerido', 'Mínimo 5 caracteres', 5)
})
