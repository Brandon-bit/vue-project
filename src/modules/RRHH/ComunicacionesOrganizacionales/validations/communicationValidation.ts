import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'

export const communicationSchema = z
    .object({
        title: stringValidator(
            'El título es requerido',
            'El título debe tener al menos 5 caracteres',
            5
        ).max(200, 'El título no puede tener más de 200 caracteres'),
        content: stringValidator(
            'El contenido es requerido',
            'El contenido debe tener al menos 10 caracteres',
            10
        ),
        images: z.array(z.string()).optional().default([]),
        publicationType: z.enum(['publish', 'departments'], {
            required_error: 'Debe seleccionar un tipo de publicación'
        }),
        departments: z.array(z.number()).optional().default([]),
        distributionMethod: z.enum(['page', 'email']).default('email'),
        scheduleDelivery: z.boolean().default(false),
        deliveryDate: z.string().optional(),
        deliveryTime: z.string().optional()
    })
    .refine(
        (data) => {
            // If publicationType is 'departments', departments array must not be empty
            if (data.publicationType === 'departments') {
                return data.departments && data.departments.length > 0
            }
            return true
        },
        {
            message: 'Debe seleccionar al menos un departamento',
            path: ['departments']
        }
    )
    .refine(
        (data) => {
            // If scheduleDelivery is true, deliveryDate and deliveryTime must be provided
            if (data.scheduleDelivery) {
                return data.deliveryDate && data.deliveryTime
            }
            return true
        },
        {
            message: 'Debe especificar la fecha y hora de envío',
            path: ['deliveryDate']
        }
    )

export type CommunicationSchemaType = z.infer<typeof communicationSchema>
