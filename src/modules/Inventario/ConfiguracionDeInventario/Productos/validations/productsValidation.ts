import { z } from 'zod'
import { stringValidator } from '@/shared/validations/globalValidation'
export const bulkProductSchema = z.object({
    name: stringValidator('dfgge', 'regreg', 20),
    archivo: z.any().superRefine((fileList, ctx) => {
        if (!fileList || fileList.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'El archivo CSV es requerido',
                path: []
            })
            return
        }

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i]
            if (!['text/csv'].includes(file.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `El archivo "${file.name}" debe ser CSV`,
                    path: [i]
                })
            }
            if (file.size > 15 * 1024 * 1024) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `El archivo "${file.name}" excede el tamaño máximo de 15MB`,
                    path: [i]
                })
            }
        }
    })
})
