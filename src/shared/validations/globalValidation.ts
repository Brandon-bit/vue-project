import { z } from 'zod'

export const selectValidator = (message: string, requiredMessage : string = message) =>
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
            .refine((val) => !isNaN(val), {
                message
            })
    )

export const numberValidator = (message: string, minMessage: string = message) => {
    return z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.number({ required_error: message }).min(1, minMessage)
    )
}

export const stringValidator = (message: string, minMessage: string, minLength: number) => {
    return z.string({ required_error: message }).min(minLength, minMessage)
}

export const dateValidator = (message: string) => {
    return z
        .string({ required_error: message })
        .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
            message: message
        })
}
