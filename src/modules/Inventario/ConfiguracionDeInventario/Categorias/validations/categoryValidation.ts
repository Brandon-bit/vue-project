import { z } from 'zod'

export const categorySchema = z.object({
    name: z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    sufix: z.string({ required_error: 'El campo slug es requerido' }).min(2, 'Mínimo 2 caracteres'),
    status: z.boolean({
        required_error: 'El campo es obligatorio',
        invalid_type_error: 'Asegúrate de elegir un estado correcto'
    })
})
