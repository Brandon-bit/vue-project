import { z } from 'zod'
import { 
    stringValidator, 
    numberValidator, 
    selectValidator,
    dateValidator
} from '@/shared/validations/globalValidation'

export const employeeSchema = z.object({
    // Datos Personales
    firstName: stringValidator(
        'El nombre es requerido',
        'El nombre debe tener al menos 2 caracteres',
        2
    ),
    lastName: stringValidator(
        'Los apellidos son requeridos',
        'Los apellidos deben tener al menos 2 caracteres',
        2
    ),
    email: z
        .string({ required_error: 'El correo electrónico es requerido' })
        .email('Debe ser un correo electrónico válido'),
    phone: stringValidator(
        'El teléfono es requerido',
        'El teléfono debe tener al menos 10 caracteres',
        10
    ),
    birthDate: dateValidator('La fecha de nacimiento es requerida', true),
    taxId: stringValidator(
        'El RFC es requerido',
        'El RFC debe tener al menos 12 caracteres',
        12
    ).max(13, 'El RFC no puede tener más de 13 caracteres'),
    address: stringValidator(
        'La dirección es requerida',
        'La dirección debe tener al menos 10 caracteres',
        10
    ),
    
    // Información Laboral
    hireDate: dateValidator('La fecha de ingreso es requerida', true),
    company: selectValidator('La empresa es requerida'),
    department: selectValidator('El departamento es requerido'),
    position: selectValidator('El puesto es requerido'),
    branch: selectValidator('La sucursal es requerida'),
    salary: numberValidator(
        'El salario es requerido',
        false,
        'El salario debe ser mayor a 0'
    ),
    contractType: selectValidator('El tipo de contrato es requerido'),
    reportsTo: selectValidator('El jefe directo es requerido', true).optional()
})

export type EmployeeSchemaType = z.infer<typeof employeeSchema>
