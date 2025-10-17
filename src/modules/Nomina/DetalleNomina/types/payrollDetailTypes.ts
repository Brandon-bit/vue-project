// Backend response type (español)
export type PayrollDetail = {
    id?: number
    periodoNomina: number
    empleado: number
    concepto: number
    monto: number
    tipo: 'percepcion' | 'deduccion'
    observaciones?: string
}

// Frontend DTO type (inglés)
export type PayrollDetailDTO = {
    id?: number
    payrollPeriodId: number
    employeeId: number
    employeeName?: string
    conceptId: number
    conceptName?: string
    conceptCode?: string
    amount: number
    type: 'percepcion' | 'deduccion'
    notes?: string
}

// Form type for create/update
export type PayrollDetailFormDTO = {
    id?: number
    payrollPeriodId: number
    employeeId: number
    conceptId: number
    amount: number
    type: 'percepcion' | 'deduccion'
    notes?: string
}

// Request type to backend
export type PayrollDetailRequest = {
    id?: number
    periodoNomina: number
    empleado: number
    concepto: number
    monto: number
    tipo: 'percepcion' | 'deduccion'
    observaciones?: string
}

// Employee summary in payroll
export type EmployeePayrollSummary = {
    employeeId: number
    employeeName: string
    employeeNumber: string
    position: string
    baseSalary: number
    totalPerceptions: number
    totalDeductions: number
    netAmount: number
    details: PayrollDetailDTO[]
}

// Payroll period summary
export type PayrollPeriodSummary = {
    periodId: number
    periodName: string
    startDate: string
    endDate: string
    status: 'borrador' | 'calculada' | 'pagada' | 'cerrada'
    totalEmployees: number
    totalPerceptions: number
    totalDeductions: number
    totalNet: number
    employees: EmployeePayrollSummary[]
}
