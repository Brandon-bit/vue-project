import { z } from 'zod'
import { dateValidator } from '@/shared/validations/globalValidation'

export const editProductExpirationSchema = z.object({
    fecha_fabricacion: dateValidator('La fecha de fabricación no es válida'),
    fecha_expiracion: dateValidator('La fecha de expiración no es válida')
})
