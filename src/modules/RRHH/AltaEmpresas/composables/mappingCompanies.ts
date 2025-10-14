import {
    Company,
    CompanyDTO,
    CompanyRequest,
    CompanyRequestPayload
} from '@/modules/RRHH/AltaEmpresas/types/companyTypes'

// Map from backend (Spanish) to DTO (English)
export const mapCompany = (data: Company): CompanyDTO => ({
    id: data.id,
    businessName: data.razonSocial,
    taxId: data.rfc,
    fiscalAddress: data.domicilioFiscal,
    initialVacationDays: data.diasVacacionesIniciales,
    payrollPolicy: data.politicaNomina,
    satCertificate: data.certificadoSAT,
    csdPassword: data.passwordCSD,
    active: data.activo
})

// Map from DTO (English) to backend payload (Spanish)
export const mapCompanyRequest = (data: CompanyRequest): CompanyRequestPayload => ({
    razonSocial: data.businessName,
    rfc: data.taxId,
    domicilioFiscal: data.fiscalAddress,
    diasVacacionesIniciales: data.initialVacationDays,
    politicaNomina: data.payrollPolicy,
    departamentos: data.departments?.map(dept => Number(dept.id)),
    passwordCSD: data.csdPassword
})

// Map from backend payload (Spanish) to DTO (English)
export const mapCompanyDTO = (data: CompanyRequestPayload): CompanyRequest => ({
    businessName: data.razonSocial,
    taxId: data.rfc,
    fiscalAddress: data.domicilioFiscal,
    initialVacationDays: data.diasVacacionesIniciales,
    payrollPolicy: data.politicaNomina,
    csdPassword: data.passwordCSD
})
