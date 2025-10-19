export interface KPI {
    name: string
    current: number
    target: number
    unit: string
}

export interface StrategicObjective {
    id: number
    name: string
    perspective: 'Financial' | 'Customer' | 'Process' | 'Learning'
    kpis: KPI[]
    initiatives: string[]
    projects: string[]
    performance: 'high' | 'medium' | 'low'
    progress: number
    active: boolean
    deleted: boolean
}
