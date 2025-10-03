import { z } from 'zod'
import {
    selectValidator,
    stringValidator,
} from '@/shared/validations/globalValidation'

const singleProductSchema = z.object({
    price: z.number({
        required_error: "El precio es requerido"
    }).min(0, "El precio debe ser mayor o igual a 0"),
    //idTaxType: selectValidator('Asegúrate de elegir un tipo de impuesto'),
    tax: z.number({
        required_error: "El impuesto es requerido"
    }).min(0, "El impuesto debe ser mayor o igual a 0"),
})

const extraInfoSchema = z.object({
    idWarranty: z.string().nullable(),
    manufacturingDate: z.date().nullable(),
    expirationDate: z.date().nullable(),
})

export const createProductSchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 10 caracteres', 10),
    slug: stringValidator('El campo slug es requerido', 'Mínimo 10 caracteres', 10),
    sku: stringValidator('El campo sku es requerido', 'Mínimo 10 caracteres', 10),
    idCategory: selectValidator('Asegúrate de elegir una categoría'),
    idSubCategory: selectValidator('Asegúrate de elegir una subcategoría'),
    idBrand: selectValidator('Asegúrate de elegir una marca'),
    idUnit: selectValidator('Asegúrate de elegir una unidad'),
    barcodeSimbology: selectValidator('Asegúrate de elegir una simbolgía de código de barras'),
    itemBarcode: stringValidator(
        'El campo código de barras es requerido',
        'Mínimo 10 caracteres',
        10
    ),
    description: stringValidator('El campo descripción es requerido', 'Mínimo 10 caracteres', 10),
    priceAndStock: singleProductSchema,
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
    extraInfo: extraInfoSchema,
})



export const addVariantProductSchema = z.object({
    variant: selectValidator('El campo valor variante es obligatorio'),
    variantValue: selectValidator('Asegúrate de elegir un valor de variante'),
    skuVariant: createProductSchema.shape.sku,
    // price: createProductSchema.shape.price,
    // barcodeSimbology: createProductSchema.shape.barcodeSimbology,
    // itemBarcode: createProductSchema.shape.itemBarcode,
    // quantity: createProductSchema.shape.quantity,
    // quantityAlert: createProductSchema.shape.quantityAlert,
    // taxType: createProductSchema.shape.taxType,
    // tax: createProductSchema.shape.tax,
    // discountType: createProductSchema.shape.discountType,
    // discountValue: createProductSchema.shape.discountValue,
    // variantImage: createProductSchema.shape.image
})
