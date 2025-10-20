// Backend types (Spanish keys)
export type Communication = {
    id: number
    titulo: string
    contenido: string
    imagenes: string[]
    tipoPublicacion: 'publicar' | 'departamentos'
    departamentos: number[]
    metodoDistribucion: 'pagina' | 'correo'
    programarEnvio: boolean
    fechaEnvio?: string
    horaEnvio?: string
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
    distributionMethod: 'page' | 'email'
    scheduleDelivery: boolean
    deliveryDate?: string
    deliveryTime?: string
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
    distributionMethod: 'page' | 'email'
    scheduleDelivery: boolean
    deliveryDate?: string
    deliveryTime?: string
}

// Request payload (Spanish keys for backend)
export type CommunicationRequestPayload = {
    titulo: string
    contenido: string
    imagenes: string[]
    tipoPublicacion: 'publicar' | 'departamentos'
    departamentos: number[]
    metodoDistribucion: 'pagina' | 'correo'
    programarEnvio: boolean
    fechaEnvio?: string
    horaEnvio?: string
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
