
import { z } from 'zod'

export const variantAttributeValueSchema = z.object({
    value: z.string().min(1)
});

export const createVariantAttributeSchema = z.object({
    name: 
        z.string({ required_error: 'El campo nombre es requerido' })
        .min(1, { message: 'El campo nombre no puede estar vacío' }),
    active: 
        z.boolean(),
    values: 
        z.array(variantAttributeValueSchema)
})