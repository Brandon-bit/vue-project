export interface SWOTItem {
    id: number
    text: string
    category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats'
    active: boolean
    deleted: boolean
}

export interface PESTELItem {
    id: number
    category: 'Political' | 'Economic' | 'Social' | 'Technological' | 'Environmental' | 'Legal'
    factor: string
    impact: number
    trend: 'growing' | 'stable' | 'declining'
    active: boolean
    deleted: boolean
}

export interface Risk {
    id: number
    name: string
    probability: number
    impact: number
    strategy: 'Mitigate' | 'Prevent' | 'Transfer' | 'Accept'
    active: boolean
    deleted: boolean
}

export interface SWOTFormData {
    category: string
    text: string
}

export interface PESTELFormData {
    category: string
    factor: string
    impact: number
    trend: string
}

export interface RiskFormData {
    name: string
    probability: number
    impact: number
    strategy: string
}
