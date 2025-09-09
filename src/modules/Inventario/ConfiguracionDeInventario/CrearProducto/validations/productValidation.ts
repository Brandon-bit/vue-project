import { z } from 'zod'
import {
    selectValidator,
    numberValidator,
    stringValidator,
    dateValidator
} from '@/shared/validations/globalValidation'

export const createProductSchema = z.object({
    //INFORMACIÓN
    store: selectValidator('Asegúrate de elegir una tienda'),
    warehouse: selectValidator('Asegúrate de elegir un almacén'),
    name: stringValidator('El campo nombre es requerido', 'Mínimo 10 caracteres', 10),
    slug: stringValidator('El campo slug es requerido', 'Mínimo 10 caracteres', 10),
    sku: stringValidator('El campo sku es requerido', 'Mínimo 10 caracteres', 10),
    sellingType: selectValidator('Asegúrate de elegir un tipo de venta'),
    category: selectValidator('Asegúrate de elegir una categoría'),
    subcategory: selectValidator('Asegúrate de elegir una subcategoría'),
    brand: selectValidator('Asegúrate de elegir una marca'),
    unit: selectValidator('Asegúrate de elegir una unidad'),
    barcodeSimbology: selectValidator('Asegúrate de elegir una simbolgía de código de barras'),
    itemBarcode: stringValidator(
        'El campo código de barras es requerido',
        'Mínimo 10 caracteres',
        10
    ),

    //PRECIO Y STOCK
    quantity: numberValidator('El campo cantidad es requerido'),
    price: numberValidator('El campo precio es requerido'),
    taxType: selectValidator('Asegúrate de elegir un tipo de impuesto'),
    tax: selectValidator('Asegúrate de elegir un impuesto'),
    discountType: selectValidator('Asegúrate de elegir un tipo de descuento'),
    discountValue: numberValidator('El campo valor de descuento es requerido'),
    quantityAlert: numberValidator('El campo cantidad alerta es requerido'),

    // IMÁGENES
    image: z
        .any()
        .optional()
        .superRefine((fileList, ctx) => {
            if (!fileList || fileList.length === 0) {
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
    warranty: stringValidator(
        'El campo garantía es requerido',
        'Mínimo 10 caracteres',
        10
    ).optional(),
    manufacturer: stringValidator(
        'El campo fabricante es requerido',
        'Mínimo 10 caracteres',
        10
    ).optional(),
    manufacturedDate: dateValidator('La fecha de fabricación no es válida').optional(),
    expiryOnDate: dateValidator('La fecha de expiración no es válida').optional()
})

export const addVariantProductSchema = z.object({
    variant: selectValidator('El campo valor variante es obligatorio'),
    variantValue: selectValidator('Asegúrate de elegir un valor de variante'),
    skuVariant: createProductSchema.shape.sku,
    price: createProductSchema.shape.price,
    barcodeSimbology: createProductSchema.shape.barcodeSimbology,
    itemBarcode: createProductSchema.shape.itemBarcode,
    quantity: createProductSchema.shape.quantity,
    quantityAlert: createProductSchema.shape.quantityAlert,
    taxType: createProductSchema.shape.taxType,
    tax: createProductSchema.shape.tax,
    discountType: createProductSchema.shape.discountType,
    discountValue: createProductSchema.shape.discountValue,
    variantImage: createProductSchema.shape.image
})
