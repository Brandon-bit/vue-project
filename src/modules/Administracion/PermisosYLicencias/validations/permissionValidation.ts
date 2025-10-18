import { z } from 'zod'

export const permissionSchema = z.object({
    permissionType: z
        .string({ required_error: 'El tipo de permiso es requerido' })
        .min(1, 'Seleccione un tipo de permiso'),
    resource: z
        .string({ required_error: 'El recurso es requerido' })
        .min(1, 'Seleccione un recurso'),
    startDate: z
        .string({ required_error: 'La fecha de inicio es requerida' })
        .min(1, 'Seleccione una fecha'),
    endDate: z
        .string({ required_error: 'La fecha de fin es requerida' })
        .min(1, 'Seleccione una fecha'),
    reason: z
        .string({ required_error: 'El motivo es requerido' })
        .min(10, 'El motivo debe tener al menos 10 caracteres')
}).refine((data) => {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    return end >= start
}, {
    message: 'La fecha de fin debe ser igual o posterior a la fecha de inicio',
    path: ['endDate']
})
