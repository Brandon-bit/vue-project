import { z } from 'zod'

// Validación para paso 1: Receptor y Periodo
export const receptorPeriodoSchema = z.object({
    rfc: z.string().min(12, 'El RFC debe tener al menos 12 caracteres').max(13, 'El RFC debe tener máximo 13 caracteres'),
    razonSocial: z.string().min(1, 'La razón social es requerida'),
    regimenFiscal: z.string().min(1, 'El régimen fiscal es requerido'),
    codigoPostal: z.string().min(5, 'El código postal debe tener 5 dígitos').max(5, 'El código postal debe tener 5 dígitos'),
    mes: z.string().min(1, 'El mes es requerido'),
    anio: z.string().min(1, 'El año es requerido')
})

// Validación para paso 2: Retenciones (se valida en el store)
export const retencionesSchema = z.object({
    retenciones: z.array(z.any()).min(1, 'Debes agregar al menos una retención')
})

// Schema completo de la constancia
export const constanciaSchema = z.object({
    rfc: z.string().min(12).max(13),
    razonSocial: z.string().min(1),
    regimenFiscal: z.string().min(1),
    codigoPostal: z.string().length(5),
    mes: z.string().min(1),
    anio: z.string().min(1),
    retenciones: z.array(z.object({
        id: z.string(),
        concepto: z.string(),
        baseCalculo: z.number().min(0.01),
        tasaISR: z.number(),
        montoISR: z.number(),
        tasaIVA: z.number(),
        montoIVA: z.number(),
        total: z.number()
    })).min(1)
})

export type ConstanciaSchemaType = z.infer<typeof constanciaSchema>
