import { z } from 'zod'

const entryItemSchema = z.object({
    id: z.string(),
    account: z.string().min(1, 'La cuenta es requerida'),
    description: z.string().min(1, 'La descripción es requerida'),
    debit: z.number().min(0, 'El debe debe ser mayor o igual a 0'),
    credit: z.number().min(0, 'El haber debe ser mayor o igual a 0'),
    reference: z.string().optional()
})

export const journalPolicySchema = z.object({
    date: z
        .string({ required_error: 'La fecha es requerida' })
        .min(1, 'La fecha es requerida'),
    concept: z
        .string({ required_error: 'El concepto es requerido' })
        .min(10, 'El concepto debe tener al menos 10 caracteres'),
    entries: z
        .array(entryItemSchema)
        .min(2, 'Debe agregar al menos 2 partidas')
        .refine(
            (entries) => {
                const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0)
                const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0)
                return Math.abs(totalDebit - totalCredit) < 0.01
            },
            {
                message: 'La póliza debe estar cuadrada (Debe = Haber)'
            }
        )
})
