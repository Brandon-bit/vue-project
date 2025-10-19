export interface Task {
    id: number
    title: string
    description: string
    initiative: string
    responsible: string
    startDate: string
    endDate: string
    status: 'pending' | 'in-progress' | 'review' | 'completed'
    priority: 'high' | 'medium' | 'low'
    active: boolean
    deleted: boolean
}

export interface TaskFormData {
    title: string
    description: string
    initiative: string
    responsible: string
    startDate: string
    endDate: string
    priority: string
}
