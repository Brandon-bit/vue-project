// Backend types (Spanish keys)
export type Communication = {
    id: number
    titulo: string
    contenido: string
    imagenes: string[]
    tipoPublicacion: 'publicar' | 'departamentos'
    departamentos: number[]
    fechaCreacion: string
    activo: boolean
    creadoPor: string
}

// DTO types (English keys for form)
export type CommunicationDTO = {
    id: number
    title: string
    content: string
    images: string[]
    publicationType: 'publish' | 'departments'
    departments: number[]
    createdAt: string
    active: boolean
    createdBy: string
}

// Request types
export type CommunicationRequest = {
    title: string
    content: string
    images: string[]
    publicationType: 'publish' | 'departments'
    departments: number[]
}

// Request payload (Spanish keys for backend)
export type CommunicationRequestPayload = {
    titulo: string
    contenido: string
    imagenes: string[]
    tipoPublicacion: 'publicar' | 'departamentos'
    departamentos: number[]
}

// Select option types
export type SelectOptionDTO = {
    id: number
    label: string
}

// Department type (same as SelectOptionDTO)
export type DepartmentDTO = SelectOptionDTO

// Response types
export type CommunicationResponseType<T> = {
    items: T[]
    totalItems: number
    page: number
    pageSize: number
}

// Stats types
export type CommunicationStats = {
    active: number
    sentThisMonth: number
}
