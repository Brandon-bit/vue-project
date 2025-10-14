import { z } from 'zod'

export const fixedAssetSchema = z.object({
    description: z.string()
        .min(1, 'La descripción es requerida')
        .min(3, 'La descripción debe tener al menos 3 caracteres'),
    brand: z.string()
        .min(1, 'La marca es requerida'),
    model: z.string()
        .min(1, 'El modelo es requerido'),
    serialNumber: z.string()
        .min(1, 'El número de serie es requerido'),
    acquisitionDate: z.string()
        .min(1, 'La fecha de adquisición es requerida'),
    supplier: z.string()
        .min(1, 'El proveedor es requerido'),
    invoice: z.string()
        .min(1, 'La factura es requerida'),
    originalValue: z.number()
        .min(0.01, 'El valor original debe ser mayor a 0'),
    usefulLife: z.number()
        .min(1, 'La vida útil debe ser al menos 1 mes'),
    accountingAccount: z.string()
        .min(1, 'La cuenta contable es requerida'),
    physicalLocation: z.string()
        .min(1, 'La ubicación física es requerida'),
    area: z.string()
        .min(1, 'El área es requerida'),
    responsible: z.string()
        .min(1, 'El responsable es requerido'),
    notes: z.string().optional(),
    status: z.enum(['Activo', 'Dado de baja'])
})
