import { z } from 'zod'
import { 
    stringValidator, 
    numberValidator, 
    selectValidator,
    optionalStringValidator 
} from '@/shared/validations/globalValidation'

export const companySchema = z.object({
    // Datos Generales
    businessName: stringValidator(
        'La razón social es requerida',
        'La razón social debe tener al menos 3 caracteres',
        3
    ),
    taxId: stringValidator(
        'El RFC es requerido',
        'El RFC debe tener al menos 12 caracteres',
        12
    ).max(13, 'El RFC no puede tener más de 13 caracteres'),
    fiscalAddress: stringValidator(
        'El domicilio fiscal es requerido',
        'El domicilio fiscal debe tener al menos 10 caracteres',
        10
    ),
    
    // Configuración Laboral
    initialVacationDays: numberValidator(
        'Los días de vacaciones son requeridos',
        false,
        'Los días de vacaciones deben ser al menos 1'
    ),
    payrollPolicy: selectValidator('La política de nómina es requerida'),
    
    // Estructura Organizacional
    departments: z.array(z.object({
        id: z.union([z.number(), z.string()]),
        label: z.string()
    })).optional(),
    
    // Datos Fiscales
    csdPassword: optionalStringValidator(
        'La contraseña debe tener al menos 8 caracteres',
        8
    )
})

export type CompanySchemaType = z.infer<typeof companySchema>
