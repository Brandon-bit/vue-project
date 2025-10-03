import { z } from 'zod'
import {
    numberValidator,
    stringValidator,
    dateValidator,
    selectValidator,
    optionalStringValidator
} from '@/shared/validations/globalValidation'

export const addInventoryEntryProductSchema = z.object({
    productId: numberValidator(
        'El campo producto id es requerido',
        true,
        'El campo producto id es requerido'
    ),
    productName: stringValidator('El campo  producto es requerido', 'Mínimo 1 caracter', 1),
    quantity: numberValidator(
        'El campo cantidad es requerido',
        false,
        'El campo cantidad debe ser mayor a 0'
    ),
    unitPrice: numberValidator(
        'El campo precio unitario es requerido',
        false,
        'El campo precio unitario debe ser mayor a 0'
    ),
    subtotal: numberValidator(
        'El campo subtotal es requerido',
        false,
        'El campo subtotal debe ser mayor a 0'
    ),
    expirationDate: dateValidator('El campo fecha de expiracion es requerido').optional(),
    batch: optionalStringValidator('Mínimo 5 caracteres', 5).optional()
})

export const createUpdateInventoryEntrySchema = z.object({
    warehouseId: selectValidator('El campo  almacén es requerido'),
    supplierId: selectValidator('El campo proveedor es requerido', true).optional(),
    referenceDocument: optionalStringValidator('Mínimo 5 caracteres', 5).optional(),
    observations: optionalStringValidator('Mínimo 5 caracteres', 5).optional(),
    date: dateValidator('El campo fecha es requerido'),
    movementTypeId: selectValidator('El campo  tipo de movimiento es requerido'),
    stateId: selectValidator('El campo estado id es requerido')
})

export const deleteProductSchema = z.object({})
