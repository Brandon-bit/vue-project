import { z } from 'zod'
import { DiscountType, DiscountStatus, ApplicationType } from '../types/discountTypes'

export const createDiscountSchema = z.object({
    name: z.string()
        .min(1, 'El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    
    description: z.string()
        .max(500, 'La descripción no puede exceder 500 caracteres')
        .optional(),
    
    type: z.nativeEnum(DiscountType, {
        errorMap: () => ({ message: 'Seleccione un tipo de descuento válido' })
    }),
    
    value: z.number()
        .min(0, 'El valor debe ser mayor a 0'),
    
    minQuantity: z.number()
        .min(1, 'La cantidad mínima debe ser mayor a 0')
        .optional(),
    
    minAmount: z.number()
        .min(0, 'El monto mínimo debe ser mayor o igual a 0')
        .optional(),
    
    maxUses: z.number()
        .min(1, 'El máximo de usos debe ser mayor a 0')
        .optional(),
    
    couponCode: z.string()
        .max(50, 'El código de cupón no puede exceder 50 caracteres')
        .optional(),
    
    startDate: z.date({
        errorMap: () => ({ message: 'La fecha de inicio es requerida' })
    }),
    
    endDate: z.date({
        errorMap: () => ({ message: 'La fecha de fin es requerida' })
    }),
    
    status: z.nativeEnum(DiscountStatus, {
        errorMap: () => ({ message: 'Seleccione un estado válido' })
    }),
    
    applicationType: z.nativeEnum(ApplicationType, {
        errorMap: () => ({ message: 'Seleccione un tipo de aplicación válido' })
    }),
    
    applicableProductIds: z.array(z.number()).optional(),
    applicableCategoryIds: z.array(z.number()).optional(),
    applicableBrandIds: z.array(z.string()).optional(),
    
    canCombine: z.boolean(),
    active: z.boolean()
}).refine((data) => {
    return data.endDate >= data.startDate
}, {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate']
}).refine((data) => {
    if (data.type === DiscountType.PERCENTAGE && data.value > 100) {
        return false
    }
    return true
}, {
    message: 'El porcentaje no puede ser mayor a 100',
    path: ['value']
}).refine((data) => {
    if (data.type === DiscountType.MIN_QUANTITY && !data.minQuantity) {
        return false
    }
    return true
}, {
    message: 'La cantidad mínima es requerida para descuentos por cantidad mínima',
    path: ['minQuantity']
}).refine((data) => {
    if (data.type === DiscountType.MIN_AMOUNT && !data.minAmount) {
        return false
    }
    return true
}, {
    message: 'El monto mínimo es requerido para descuentos por monto mínimo',
    path: ['minAmount']
})
