import { z } from 'zod'

export const createBrandSchema = z.object({
    name: z.string()
        .min(2, 'Mínimo 2 caracteres'),
    active: z.boolean(),
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