import { selectValidator } from '@/shared/validations/globalValidation';
import { z } from 'zod'

export const subCategorySchema = z.object({
    parentCategoryId: selectValidator('Asegúrate de elegir una categoría'),
    name: z
        .string({ required_error: 'El campo nombre es requerido' })
        .min(3, 'Mínimo 3 caracteres'),
    slug: z.string({ required_error: 'El campo slug es requerido' }).min(2, 'Mínimo 2 caracteres'),
    status: z.boolean({
        required_error: 'El campo es obligatorio',
        invalid_type_error: 'Asegúrate de elegir un estado correcto'
    }),
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
        removeImage: z.boolean()
})
