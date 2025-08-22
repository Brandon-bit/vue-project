import { z } from 'zod'

export const createProductSchema = z.object({
    //INFORMACIÓN
    store: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo tienda es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una categoría'
        }),
    warehouse: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo alamacén es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir un almacén'
        }),
    name: z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    slug: z
        .string({ required_error: 'El campo slug es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    sku: z.string({ required_error: 'El campo sku es requerido' }).min(10, 'Mínimo 10 caracteres'),
    sellingType: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo tipo de venta es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir un tipo de venta'
        }),
    category: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo categoría es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una categoría'
        }),
    subcategory: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo subcategoría es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una subcategoría'
        }),
    brand: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo marca es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una marca'
        }),
    unit: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo unidad es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una unidad'
        }),
    barcodeSimbology: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo simbolgía código de barras es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una simbolgía de código de barras'
        }),
    itemBarcode: z
        .string({ required_error: 'El campo código de barras es requerido' })
        .nonempty('El campo código de barras es requerido')
        .min(10, 'Mínimo 10 caracteres'),

    //PRECIO Y STOCK
    quantity: z
        .number({ required_error: 'El campo cantidad es obligatorio' })
        .refine((val) => val === undefined || !isNaN(val), {
            message: 'Asegúrate de ingresar una cantidad válida'
        }),
    price: z
        .number({ required_error: 'El campo precio es obligatorio' })
        .refine((val) => val === undefined || !isNaN(val), {
            message: 'Asegúrate de ingresar una cantidad válida'
        }),
    taxType: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo tipo de impuesto es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir un tipo de impuesto'
        }),
    tax: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo tipo impuesto es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir un impuesto'
        }),
    discountType: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo tipo de descuento es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir un tipo de descuento'
        }),
    discountValue: z
        .number({ required_error: 'El campo valor de descuento es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    quantityAlert: z
        .number({ required_error: 'El campo cantidad alerta es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    // IMÁGENES

    image: z
        .custom<FileList | undefined>((value) => value instanceof FileList || value === undefined, {
            message: 'Debes subir al menos una imagen'
        })
        .optional()
        .superRefine((fileList, ctx) => {
            if (!fileList || fileList.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Debes subir al menos una imagen'
                })
                return
            }

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]
                if (!['image/jpeg', 'image/png'].includes(file.type)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `El archivo "${file.name}" debe ser JPG o PNG`,
                        path: [i]
                    })
                }
                if (file.size > 2 * 1024 * 1024) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `El archivo "${file.name}" excede el tamaño máximo de 2MB`,
                        path: [i]
                    })
                }
            }
        }),

    //EXTRAS
    warranty: z.string().min(10, 'Mínimo 10 caracteres').optional(),
    manufacturer: z.string().min(10, 'Mínimo 10 caracteres').optional(),
    manufacturedDate: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'La fecha de fabricación no es válida'
        }),
    expiryOnDate: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: 'La fecha de expiración no es válida'
        })
})

export const addVariantProductSchema = z.object({
    variant: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo variante es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir una variante'
        }),
    variantValue: z
        .string()
        .refine((val) => val !== '', {
            message: 'El campo valor variante es obligatorio'
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: 'Asegúrate de elegir un valor de variante'
        }),
    skuVariant: z
        .string({ required_error: 'El campo sku es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    barcodeSimbology: createProductSchema.shape.barcodeSimbology,
    itemBarcode: createProductSchema.shape.itemBarcode,
    quantity: createProductSchema.shape.quantity,
    quantityAlert: createProductSchema.shape.quantity,
    taxType: createProductSchema.shape.taxType,
    tax: createProductSchema.shape.tax,
    discountType: createProductSchema.shape.discountType,
    discountValue: createProductSchema.shape.discountValue,
    variantImage: createProductSchema.shape.image
})
