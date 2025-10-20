// Backend types (Spanish keys)
export type Branch = {
    id: number
    empresaId: number
    nombre: string
    direccion: string
    telefono: string
    activo: boolean
}

// DTO types (English keys for form)
export type BranchDTO = {
    id: number
    companyId: number
    companyName: string
    name: string
    address: string
    phone: string
    active: boolean
}

// Form types
export type BranchForm = {
    id?: number
    companyId: number
    name: string
    address: string
    phone: string
    active: boolean
}

// Request types
export type BranchRequest = {
    companyId: number
    name: string
    address: string
    phone: string
    active?: boolean
}

export type BranchRequestPayload = {
    empresaId: number
    nombre: string
    direccion: string
    telefono: string
    activo?: boolean
}

export type BranchResponseType<T> = {
    items: T[]
    totalItems: number
    page: number
    pageSize: number
}
