export interface BSCObjective {
    name: string
    perspective: string
    progress: number
    status: 'high' | 'medium' | 'low'
}

export interface KeyInitiative {
    name: string
    progress: number
    budget: string
    status: string
}

export interface StrategicProject {
    name: string
    progress: number
    responsible: string
    status: 'on-track' | 'at-risk' | 'delayed'
}

export interface FinancialKPI {
    name: string
    current: number
    target: number
    unit: string
}

export interface ActiveRisk {
    name: string
    severity: 'high' | 'medium' | 'low'
    probability: number
    impact: number
}
