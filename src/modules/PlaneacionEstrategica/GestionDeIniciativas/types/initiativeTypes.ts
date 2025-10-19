export interface Initiative {
    id: number
    name: string
    description: string
    objective: string
    leader: string
    startDate: string
    endDate: string
    progress: number
    status: 'planning' | 'in-progress' | 'paused' | 'completed'
    budget: string
    converted: boolean
    active: boolean
    deleted: boolean
}

export interface InitiativeFormData {
    name: string
    description: string
    objective: string
    leader: string
    startDate: string
    endDate: string
    budget: string
    status: string
}

export interface ProjectFormData {
    name: string
    description: string
    objective: string
    leader: string
    startDate: string
    endDate: string
    budget: string
}
