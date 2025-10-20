export interface Identity {
    id: number
    mission: string
    vision: string
    values: string
    active: boolean
    deleted: boolean
}

export interface Objective {
    id: number
    name: string
    description: string
    specific: boolean
    measurable: boolean
    achievable: boolean
    relevant: boolean
    timeBound: boolean
    perspective: 'Financial' | 'Customer' | 'Process' | 'Learning'
    kpi: string
    target: string
    deadline: string
    active: boolean
    deleted: boolean
}

export interface IdentityFormData {
    mission: string
    vision: string
    values: string
}

export interface ObjectiveFormData {
    name: string
    description: string
    specific: boolean
    measurable: boolean
    achievable: boolean
    relevant: boolean
    timeBound: boolean
    perspective: string
    kpi: string
    target: string
    deadline: string
}
