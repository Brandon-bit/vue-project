import { z } from 'zod'

export const supplierSchema = z.object({
    nombre: z.string().min(3, 'La razón social debe tener al menos 3 caracteres'),
    rfc: z.string()
        .min(12, 'El RFC debe tener al menos 12 caracteres')
        .max(13, 'El RFC debe tener máximo 13 caracteres')
        .regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, 'Formato de RFC inválido'),
    categoria: z.string().min(1, 'La categoría es requerida'),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
    email: z.string().email('Email inválido'),
    banco: z.string().min(1, 'El banco es requerido'),
    clabe: z.string()
        .length(18, 'La CLABE debe tener exactamente 18 dígitos')
        .regex(/^\d{18}$/, 'La CLABE solo debe contener números'),
    direccion: z.string().optional(),
    contactoPrincipal: z.string().optional()
})

export type SupplierSchemaType = z.infer<typeof supplierSchema>
