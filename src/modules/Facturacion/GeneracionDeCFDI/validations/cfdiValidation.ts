import { z } from 'zod'

// Validación para paso 1: Datos del Comprobante
export const datosComprobanteSchema = z.object({
    // Receptor
    receptorRfc: z.string().min(12, 'El RFC debe tener al menos 12 caracteres').max(13, 'El RFC debe tener máximo 13 caracteres'),
    receptorRazonSocial: z.string().min(1, 'La razón social es requerida'),
    receptorRegimenFiscal: z.string().min(1, 'El régimen fiscal es requerido'),
    receptorCodigoPostal: z.string().min(5, 'El código postal debe tener 5 dígitos').max(5, 'El código postal debe tener 5 dígitos'),
    receptorUsoCFDI: z.string().min(1, 'El uso de CFDI es requerido'),
    
    // Comprobante
    metodoPago: z.string().min(1, 'El método de pago es requerido'),
    formaPago: z.string().min(1, 'La forma de pago es requerida'),
    moneda: z.string().min(1, 'La moneda es requerida')
})

// Validación para paso 2: Conceptos
export const conceptosSchema = z.object({
    conceptos: z.array(z.any()).min(1, 'Debes agregar al menos un concepto')
})

// Schema completo del CFDI
export const cfdiSchema = z.object({
    emisor: z.object({
        rfc: z.string(),
        razonSocial: z.string(),
        regimenFiscal: z.string(),
        codigoPostal: z.string()
    }),
    receptor: z.object({
        rfc: z.string().min(12).max(13),
        razonSocial: z.string().min(1),
        regimenFiscal: z.string().min(1),
        codigoPostal: z.string().length(5),
        usoCFDI: z.string().min(1)
    }),
    comprobante: z.object({
        metodoPago: z.string().min(1),
        formaPago: z.string().min(1),
        moneda: z.string().min(1)
    }),
    conceptos: z.array(z.object({
        id: z.string(),
        claveProdServ: z.string(),
        claveUnidad: z.string(),
        descripcion: z.string().min(1),
        cantidad: z.number().min(1),
        valorUnitario: z.number().min(0.01),
        importe: z.number(),
        iva: z.number(),
        total: z.number()
    })).min(1)
})

export type CFDISchemaType = z.infer<typeof cfdiSchema>
