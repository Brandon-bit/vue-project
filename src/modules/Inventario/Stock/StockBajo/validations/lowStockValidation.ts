import { z } from 'zod'
import { numberValidator } from '@/shared/validations/globalValidation'

export const updateLowStockSchema = z.object({
    cantidad: numberValidator('El campo cantidad es requerido'),
    cantidadAlerta: numberValidator('El campo cantidad alerta es requerido')
})
