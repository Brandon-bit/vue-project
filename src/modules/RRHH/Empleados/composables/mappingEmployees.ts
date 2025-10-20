import {
    Employee,
    EmployeeDTO,
    EmployeeRequest,
    EmployeeRequestPayload
} from '@/modules/RRHH/Empleados/types/employeeTypes'

// Map from backend (Spanish) to DTO (English)
export const mapEmployee = (data: Employee): EmployeeDTO => ({
    id: data.id,
    firstName: data.nombre,
    lastName: data.apellidos,
    email: data.email,
    phone: data.telefono,
    birthDate: data.fechaNacimiento,
    taxId: data.rfc,
    address: data.direccion,
    employeeNumber: data.numeroEmpleado,
    hireDate: data.fechaIngreso,
    company: data.empresa.toString(),
    department: data.departamento.toString(),
    position: data.puesto.toString(),
    branch: data.sucursal.toString(),
    salary: data.salario,
    contractType: data.tipoContrato,
    reportsTo: data.reportaA ? data.reportaA.toString() : null,
    active: data.activo
})

// Map from DTO (English) to backend payload (Spanish)
export const mapEmployeeRequest = (data: EmployeeRequest): EmployeeRequestPayload => ({
    nombre: data.firstName,
    apellidos: data.lastName,
    email: data.email,
    telefono: data.phone,
    fechaNacimiento: data.birthDate,
    rfc: data.taxId,
    direccion: data.address,
    fechaIngreso: data.hireDate,
    empresa: data.company,
    departamento: data.department,
    puesto: data.position,
    sucursal: data.branch,
    salario: data.salary,
    tipoContrato: data.contractType,
    reportaA: data.reportsTo
})

// Map from backend payload (Spanish) to DTO (English)
export const mapEmployeeDTO = (data: EmployeeRequestPayload): EmployeeRequest => ({
    firstName: data.nombre,
    lastName: data.apellidos,
    email: data.email,
    phone: data.telefono,
    birthDate: data.fechaNacimiento,
    taxId: data.rfc,
    address: data.direccion,
    hireDate: data.fechaIngreso,
    company: data.empresa,
    department: data.departamento,
    position: data.puesto,
    branch: data.sucursal,
    salary: data.salario,
    contractType: data.tipoContrato,
    reportsTo: data.reportaA
})
