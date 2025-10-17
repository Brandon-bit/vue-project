import { z } from 'zod'

export const purchaseOrderSchema = z.object({
    creationMode: z.enum(['solicitud', 'directa']),
    requestId: z.number().optional(),
    supplierId: z
        .string({ required_error: 'El proveedor es requerido' })
        .min(1, 'El proveedor es requerido'),
    requestingArea: z.string().optional(),
    expectedDeliveryDays: z
        .string({ required_error: 'La fecha de entrega es requerida' })
        .min(1, 'La fecha de entrega es requerida')
}).refine(
    (data) => {
        if (data.creationMode === 'solicitud') {
            return data.requestId !== undefined && data.requestId > 0
        }
        return true
    },
    {
        message: 'Debe seleccionar una solicitud aprobada',
        path: ['requestId']
    }
).refine(
    (data) => {
        if (data.creationMode === 'directa') {
            return data.requestingArea !== undefined && data.requestingArea.length > 0
        }
        return true
    },
    {
        message: 'Debe seleccionar un área solicitante',
        path: ['requestingArea']
    }
)
