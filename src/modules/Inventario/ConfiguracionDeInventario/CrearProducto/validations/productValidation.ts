import { z } from 'zod'

const selectValidator = (message: string) =>
    z.preprocess(
        (val) => {
            if (val === '' || val === null || val === undefined) return undefined
            return Number(val)
        },
        z
            .number({
                invalid_type_error: message,
                required_error: message
            })
            .refine((val) => !isNaN(val), {
                message
            })
    )

export const createProductSchema = z.object({
    //INFORMACIÓN
    store: selectValidator('Asegúrate de elegir una tienda'),
    warehouse: selectValidator('Asegúrate de elegir un almacén'),
    name: z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    slug: z
        .string({ required_error: 'El campo slug es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    sku: z.string({ required_error: 'El campo sku es requerido' }).min(10, 'Mínimo 10 caracteres'),
    sellingType: selectValidator('Asegúrate de elegir un tipo de venta'),
    category: selectValidator('Asegúrate de elegir una categoría'),
    subcategory: selectValidator('Asegúrate de elegir una subcategoría'),
    brand: selectValidator('Asegúrate de elegir una marca'),
    unit: selectValidator('Asegúrate de elegir una unidad'),
    barcodeSimbology: selectValidator('Asegúrate de elegir una simbolgía de código de barras'),
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
    taxType: selectValidator('Asegúrate de elegir un tipo de impuesto'),
    tax: selectValidator('Asegúrate de elegir un impuesto'),
    discountType: selectValidator('Asegúrate de elegir un tipo de descuento'),
    discountValue: z
        .number({ required_error: 'El campo valor de descuento es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    quantityAlert: z
        .number({ required_error: 'El campo cantidad alerta es requerido' })
        .min(10, 'Mínimo 10 caracteres'),

    // IMÁGENES
    image: z
        .any()
        .optional()
        .superRefine((fileList, ctx) => {
            // Si no hay fileList o está vacío, es válido
            if (!fileList || fileList.length === 0) {
                return
            }

            // Validaciones solo si hay archivos
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
    variant: selectValidator('El campo valor variante es obligatorio'),
    variantValue: selectValidator('Asegúrate de elegir un valor de variante'),
    skuVariant: z
        .string({ required_error: 'El campo sku es requerido' })
        .min(10, 'Mínimo 10 caracteres'),
    price: z
        .number({ required_error: 'El campo precio es obligatorio' })
        .refine((val) => val === undefined || !isNaN(val), {
            message: 'Asegúrate de ingresar una cantidad válida'
        }),
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
