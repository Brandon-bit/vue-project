import { z } from 'zod'

export const expenseSchema = z.object({
    pettyBoxId: z
        .number({ required_error: 'Debe seleccionar una caja chica' })
        .min(1, 'Debe seleccionar una caja chica válida'),
    date: z
        .string({ required_error: 'La fecha es requerida' })
        .min(1, 'La fecha es requerida'),
    concept: z
        .string({ required_error: 'El concepto es requerido' })
        .min(3, 'Mínimo 3 caracteres'),
    amount: z
        .number({ required_error: 'El monto es requerido' })
        .positive('El monto debe ser mayor a 0'),
    costCenter: z
        .string({ required_error: 'El centro de costo es requerido' })
        .min(2, 'Debe seleccionar un centro de costo'),
    description: z
        .string({ required_error: 'La descripción es requerida' })
        .min(10, 'Mínimo 10 caracteres'),
    receipt: z
        .any()
        .optional()
        .superRefine((fileList, ctx) => {
            if (!fileList || fileList.length === 0) {
                return
            }

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i]
                if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `El archivo "${file.name}" debe ser JPG, PNG o PDF`,
                        path: [i]
                    })
                }
                if (file.size > 5 * 1024 * 1024) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `El archivo "${file.name}" excede el tamaño máximo de 5MB`,
                        path: [i]
                    })
                }
            }
        }),
    removeReceipt: z.boolean()
})
