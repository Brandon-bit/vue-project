// Employee bank info
export type EmployeeBankInfo = {
    employeeId: number
    employeeName: string
    bankName: string
    accountNumber: string
    clabe?: string
    netAmount: number
}

// Dispersion record
export type DispersionRecord = {
    id?: number
    periodId: number
    periodName: string
    fileName: string
    totalEmployees: number
    totalAmount: number
    generatedBy: string
    generatedAt: string
    status: 'generado' | 'aplicado'
}

// Dispersion validation result
export type DispersionValidation = {
    isValid: boolean
    errors: string[]
    warnings: string[]
    employeesWithoutAccount: EmployeeBankInfo[]
    employeesReady: EmployeeBankInfo[]
}

// CSV export options
export type CSVExportOptions = {
    includeHeaders: boolean
    separator: ',' | ';' | '\t'
    encoding: 'UTF-8' | 'ISO-8859-1'
}
