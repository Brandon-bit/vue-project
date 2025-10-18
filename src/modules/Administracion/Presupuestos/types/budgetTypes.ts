export type BudgetType = {
    id?: number
    area: string
    budgeted: number
    spent: number
    percentage: number
    status: 'success' | 'warning' | 'danger'
    fiscalYear: number
    creationDate: Date
}

export type BudgetResponseType = {
    id: number
    area: string
    presupuestado: number
    gastado: number
    porcentaje: number
    status: string
    anioFiscal: number
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type BudgetFormType = {
    area: string
    budgeted: number
    fiscalYear: number
    description?: string
}

export type BudgetSummaryType = {
    totalBudgeted: number
    totalSpent: number
    totalAvailable: number
    totalPercentage: number
}

export type FilterType = {
    fiscalYear: number
    area: string
}
