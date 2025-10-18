import { z } from 'zod'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const ACCEPTED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/jpg',
    'image/png'
]

export const documentSchema = z.object({
    name: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'Mínimo 3 caracteres'),
    category: z
        .string({ required_error: 'La categoría es requerida' })
        .min(1, 'Seleccione una categoría'),
    documentType: z
        .string({ required_error: 'El tipo de documento es requerido' })
        .min(1, 'Seleccione un tipo'),
    tags: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    confidential: z
        .boolean()
        .default(false),
    file: z
        .instanceof(FileList)
        .optional()
        .refine((files) => {
            if (!files || files.length === 0) return true
            return files[0].size <= MAX_FILE_SIZE
        }, 'El archivo no debe superar los 50MB')
        .refine((files) => {
            if (!files || files.length === 0) return true
            return ACCEPTED_FILE_TYPES.includes(files[0].type)
        }, 'Tipo de archivo no permitido. Use PDF, DOC, XLS, JPG o PNG')
})
