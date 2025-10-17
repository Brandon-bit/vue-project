import { z } from 'zod'

export const productCatalogSchema = z.object({
    code: z
        .string({ required_error: 'El código es requerido' })
        .min(1, 'El código es requerido')
        .regex(/^[A-Z]{3}-\d{3}$/, 'El código debe tener el formato XXX-000'),
    name: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    category: z
        .string({ required_error: 'La categoría es requerida' })
        .min(1, 'La categoría es requerida'),
    unit: z
        .string({ required_error: 'La unidad de medida es requerida' })
        .min(1, 'La unidad de medida es requerida'),
    estimatedCost: z
        .number({ required_error: 'El costo estimado es requerido' })
        .min(0.01, 'El costo estimado debe ser mayor a 0'),
    preferredSupplier: z
        .string({ required_error: 'El proveedor preferente es requerido' })
        .min(1, 'El proveedor preferente es requerido'),
    accountingAccount: z.string().optional(),
    description: z.string().optional()
})
