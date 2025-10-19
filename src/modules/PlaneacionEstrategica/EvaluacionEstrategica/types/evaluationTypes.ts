export interface Lesson {
    id: number
    objective: string
    lesson: string
    type: 'success' | 'improvement' | 'problem'
    impact: string
    actions: string
    active: boolean
    deleted: boolean
}

export interface LessonFormData {
    objective: string
    lesson: string
    type: string
    impact: string
    actions: string
}

export interface PeriodClosure {
    period: string
    generalCompliance: number
    highlightedAchievements: string
    opportunityAreas: string
    recommendations: string
}

export interface PeriodResults {
    evaluatedObjectives: number
    completedObjectives: number
    averageCompliance: number
    completedInitiatives: number
    ongoingInitiatives: number
    greenKPIs: number
    yellowKPIs: number
    redKPIs: number
}
