import { z } from 'zod'

export const accountSchema = z.object({
    code: z
        .string({ required_error: 'El código es requerido' })
        .min(1, 'El código es requerido')
        .regex(/^[0-9]+$/, 'El código debe contener solo números'),
    name: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    type: z
        .string({ required_error: 'El tipo es requerido' })
        .min(1, 'Debe seleccionar un tipo'),
    nature: z
        .enum(['Deudora', 'Acreedora'], {
            required_error: 'La naturaleza es requerida',
            invalid_type_error: 'Debe seleccionar una naturaleza válida'
        }),
    level: z
        .string({ required_error: 'El nivel es requerido' })
        .min(1, 'Debe seleccionar un nivel'),
    currency: z
        .string({ required_error: 'La moneda es requerida' })
        .min(1, 'Debe seleccionar una moneda'),
    acceptsMovements: z.boolean({
        required_error: 'Este campo es obligatorio',
        invalid_type_error: 'Valor inválido'
    }),
    requiresAuxiliary: z.boolean({
        required_error: 'Este campo es obligatorio',
        invalid_type_error: 'Valor inválido'
    }),
    active: z.boolean({
        required_error: 'Este campo es obligatorio',
        invalid_type_error: 'Valor inválido'
    })
})
