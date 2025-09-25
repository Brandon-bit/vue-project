import { z } from 'zod'
import {
    numberValidator,
    stringValidator,
    dateValidator,
    selectValidator,
    optionalStringValidator
} from '@/shared/validations/globalValidation'

export const createUpdateInventoryAuditSchema = z.object({
    date: dateValidator('El campo fecha es requerido'),
    auditorId: selectValidator('El campo auditor es requerido'),
    product: stringValidator('El campo  producto es requerido', 'Mínimo 1 caracter', 1),
    difference: numberValidator(
        'El campo diferencia es requerido',
        true,
        'El campo diferencia es requerido'
    ),
    count: numberValidator('El campo conteo es requerido', true, 'El campo conteo es requerido'),
    note: stringValidator('El campo nota es requerido', 'Mínimo 10 caracteres', 10)
})

export const addProductInventoryAuditSchema = z.object({
    productId: numberValidator('El campo producto Id es requerido'),
    product: stringValidator('El campo  producto es requerido', 'Mínimo 1 caracter', 1),
    difference: numberValidator(
        'El campo diferencia es requerido',
        true,
        'El campo diferencia es requerido'
    ),
    realCount: numberValidator(
        'El campo conteo real es requerido',
        true,
        'El campo conteo real es requerido'
    ),
    expectedCount: numberValidator(
        'El campo conteo esperado es requerido',
        true,
        'El campo conteo esperado es requerido'
    ),
    note: optionalStringValidator('Mínimo 5 caracteres', 5).optional()
})
