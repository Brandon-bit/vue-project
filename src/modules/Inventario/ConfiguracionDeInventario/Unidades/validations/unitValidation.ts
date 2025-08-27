import { z } from 'zod'

export const createUnitSchema = z.object({
    name: 
        z.string({ required_error: 'El campo nombre es requerido' })
        .min(1, { message: 'El campo nombre no puede estar vacío' }),
    shortName: 
        z.string({ required_error: 'El campo abreviación es requerido' })
        .min(1, { message: 'El campo abreviación no puede estar vacío' }),
    active: 
        z.boolean()
})