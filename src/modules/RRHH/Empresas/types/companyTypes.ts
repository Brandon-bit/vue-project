// Backend types (Spanish keys)
export type Company = {
    id: number
    razonSocial: string
    rfc: string
    domicilioFiscal: string
    diasVacacionesIniciales: number
    politicaNomina: string
    certificadoSAT: string | null
    passwordCSD: string
    activo: boolean
}

// DTO types (English keys for form)
export type CompanyDTO = {
    id: number
    businessName: string
    taxId: string
    fiscalAddress: string
    initialVacationDays: number
    payrollPolicy: string
    satCertificate: string | null
    csdPassword: string
    active: boolean
}

// Form types
export type CompanyForm = {
    id: number
    businessName: string
    taxId: string
    fiscalAddress: string
    initialVacationDays: number
    payrollPolicy: number
    csdPassword: string
}

// Department types
export type Department = {
    id: number
    nombre: string
}

export type DepartmentDTO = {
    id: number | string
    label: string
}

// Request types
export type CompanyRequest = {
    businessName: string
    taxId: string
    fiscalAddress: string
    initialVacationDays: number
    payrollPolicy: number
    departments?: DepartmentDTO[]
    csdPassword?: string
}

export type CompanyRequestPayload = {
    razonSocial: string
    rfc: string
    domicilioFiscal: string
    diasVacacionesIniciales: number
    politicaNomina: number
    departamentos?: number[]
    passwordCSD?: string
}

export type CompanyResponseType<T> = {
    items: T[]
    totalItems: number
    page: number
    pageSize: number
}
