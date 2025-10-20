// Backend types (Spanish keys)
export type Position = {
    id: number
    departamentoId: number
    nombre: string
    descripcion: string
    activo: boolean
}

// DTO types (English keys for form)
export type PositionDTO = {
    id: number
    departmentId: number
    departmentName: string
    name: string
    description: string
    active: boolean
}

// Form types
export type PositionForm = {
    id?: number
    departmentId: number
    name: string
    description: string
    active: boolean
}

// Request types
export type PositionRequest = {
    departmentId: number
    name: string
    description: string
    active?: boolean
}

export type PositionRequestPayload = {
    departamentoId: number
    nombre: string
    descripcion: string
    activo?: boolean
}

export type PositionResponseType<T> = {
    items: T[]
    totalItems: number
    page: number
    pageSize: number
}
