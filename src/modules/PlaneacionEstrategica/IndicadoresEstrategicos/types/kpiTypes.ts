export interface KPI {
    id: number
    name: string
    description: string
    type: 'KPI' | 'OKR'
    perspective: 'Financial' | 'Customer' | 'Process' | 'Learning'
    objective: string
    currentValue: number
    target: number
    unit: string
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual'
    trend: 'ascending' | 'descending' | 'stable'
    status: 'meeting' | 'attention' | 'critical'
    dataSource: string
    active: boolean
    deleted: boolean
}

export interface KPIFormData {
    name: string
    description: string
    type: string
    perspective: string
    objective: string
    target: number
    unit: string
    frequency: string
    dataSource: string
}
