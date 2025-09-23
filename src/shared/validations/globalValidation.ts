import { z } from 'zod'

export const selectValidator = (
    message: string,
    requiredMessage: string = message,
    allowZero: boolean = false
) =>
    z.preprocess(
        (val) => {
            if (val === '' || val === null || val === undefined) return undefined
            return Number(val)
        },
        z
            .number({
                invalid_type_error: requiredMessage,
                required_error: requiredMessage
            })
            .refine(
                (val) => {
                    if (isNaN(val)) return false
                    if (!allowZero && val === 0) return false
                    return true
                },
                {
                    message
                }
            )
    )

export const numberValidator = (
    message: string,
    allowNegative: boolean = false,
    minMessage?: string
) => {
    return z.preprocess(
        (val) => (val === '' ? undefined : val),
        allowNegative
            ? z.number({ required_error: message })
            : z.number({ required_error: message }).min(1, minMessage || message)
    )
}

export const stringValidator = (message: string, minMessage: string, minLength: number) => {
    return z.string({ required_error: message }).min(minLength, minMessage)
}

export const dateValidator = (message: string) => {
    return z
        .string({ required_error: message })
        .min(1, { message })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message })
}
