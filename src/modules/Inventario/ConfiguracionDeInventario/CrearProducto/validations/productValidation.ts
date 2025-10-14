import { z } from 'zod'
import {
    selectValidator,
    stringValidator,
} from '@/shared/validations/globalValidation'

const singleProductSchema = z.object({
    price: z.number({
        required_error: "El precio es requerido"
    }).min(0, "El precio debe ser mayor o igual a 0"),
    idTaxType: selectValidator('Asegúrate de elegir un tipo de impuesto'),
})

export const createProductSchema = z.object({
    name: stringValidator('El campo nombre es requerido', 'Mínimo 10 caracteres', 10),
    slug: stringValidator('El campo slug es requerido', 'Mínimo 10 caracteres', 10),
    idCategory: selectValidator('Asegúrate de elegir una categoría'),
    idSubCategory: selectValidator('Asegúrate de elegir una subcategoría'),
    idBrand: selectValidator('Asegúrate de elegir una marca'),
    idUnit: selectValidator('Asegúrate de elegir una unidad'),
    description: stringValidator('El campo descripción es requerido', 'Mínimo 10 caracteres', 10),
    singleProduct: singleProductSchema,
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
    })
})

export const addVariantProductSchema = z.object({
    idVariant: selectValidator('El campo valor variante es obligatorio'),
    variantValue: z
        .string()
        .refine(val => val !== '0', {
            message: 'Asegúrate de elegir un valor de variante',
        }
    ),
    variantPrice: z.number({
        required_error: "El precio es requerido"
    }).min(0, "El precio debe ser mayor o igual a 0"),
})
