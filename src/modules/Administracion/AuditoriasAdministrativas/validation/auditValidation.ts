import { z } from 'zod'

export const auditSchema = z.object({
    nombre: z
        .string({ required_error: 'El nombre es requerido' })
        .min(10, 'El nombre debe tener al menos 10 caracteres'),
    tipo: z
        .enum(['Fiscal', 'Operativa', 'Cumplimiento', 'Calidad'], { 
            required_error: 'El tipo es requerido' 
        }),
    area: z
        .string({ required_error: 'El área es requerida' })
        .min(1, 'Seleccione un área'),
    auditor: z
        .string({ required_error: 'El auditor es requerido' })
        .min(3, 'El auditor debe tener al menos 3 caracteres'),
    fechaInicio: z
        .string({ required_error: 'La fecha de inicio es requerida' })
        .min(1, 'Seleccione una fecha de inicio'),
    fechaFin: z
        .string({ required_error: 'La fecha de fin es requerida' })
        .min(1, 'Seleccione una fecha de fin'),
    objetivo: z
        .string({ required_error: 'El objetivo es requerido' })
        .min(20, 'El objetivo debe tener al menos 20 caracteres'),
    activo: z.boolean().default(true)
}).refine((data) => {
    const inicio = new Date(data.fechaInicio)
    const fin = new Date(data.fechaFin)
    return fin >= inicio
}, {
    message: 'La fecha de fin debe ser igual o posterior a la fecha de inicio',
    path: ['fechaFin']
})

export const findingSchema = z.object({
    auditoriaId: z
        .number({ required_error: 'La auditoría es requerida' })
        .min(1, 'Seleccione una auditoría'),
    severidad: z
        .enum(['Alta', 'Media', 'Baja'], { 
            required_error: 'La severidad es requerida' 
        }),
    descripcion: z
        .string({ required_error: 'La descripción es requerida' })
        .min(20, 'La descripción debe tener al menos 20 caracteres'),
    responsable: z
        .string({ required_error: 'El responsable es requerido' })
        .min(3, 'El responsable debe tener al menos 3 caracteres'),
    fechaLimite: z
        .string({ required_error: 'La fecha límite es requerida' })
        .min(1, 'Seleccione una fecha límite'),
    estado: z
        .enum(['Pendiente', 'En Proceso', 'Completado'])
        .default('Pendiente')
})
