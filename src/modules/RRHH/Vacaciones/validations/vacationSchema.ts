import { z } from 'zod'
import { numberValidator, stringValidator, optionalStringValidator } from '@/shared/validations/globalValidation'

export const createVacationSchema = z
    .object({
        employeeId: numberValidator(
            'El campo empleado es requerido',
            true,
            'El campo empleado es requerido'
        ),
        employeeName: stringValidator('El campo empleado es requerido', 'Mínimo 1 caracter', 1),
        startDate: stringValidator('La fecha de inicio es requerida', 'Fecha inválida', 1),
        endDate: stringValidator('La fecha de fin es requerida', 'Fecha inválida', 1),
        comments: optionalStringValidator('Mínimo 3 caracteres', 3)
    })
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return new Date(data.startDate) <= new Date(data.endDate)
            }
            return true
        },
        {
            message: 'La fecha de inicio debe ser anterior o igual a la fecha de fin',
            path: ['endDate']
        }
    )

export const updateVacationSchema = z
    .object({
        employeeId: numberValidator(
            'El campo empleado es requerido',
            true,
            'El campo empleado es requerido'
        ),
        employeeName: stringValidator('El campo empleado es requerido', 'Mínimo 1 caracter', 1),
        startDate: stringValidator('La fecha de inicio es requerida', 'Fecha inválida', 1),
        endDate: stringValidator('La fecha de fin es requerida', 'Fecha inválida', 1),
        comments: optionalStringValidator('Mínimo 3 caracteres', 3),
        status: z.enum(['pending', 'approved', 'rejected'], {
            errorMap: () => ({ message: 'Seleccione un estado válido' })
        })
    })
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return new Date(data.startDate) <= new Date(data.endDate)
            }
            return true
        },
        {
            message: 'La fecha de inicio debe ser anterior o igual a la fecha de fin',
            path: ['endDate']
        }
    )

export const deleteVacationSchema = z.object({})
