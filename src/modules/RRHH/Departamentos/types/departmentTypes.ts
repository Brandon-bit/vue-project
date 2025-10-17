// Backend response type (español)
export type Department = {
    id?: number
    nombre: string
    descripcion?: string
    activo: boolean
}

// Frontend DTO type (inglés)
export type DepartmentDTO = {
    id?: number
    name: string
    description?: string
    active: boolean
}

// Form type for create/update
export type DepartmentFormDTO = {
    id?: number
    name: string
    description?: string
    active: boolean
}

// Request type to backend
export type DepartmentRequest = {
    id?: number
    nombre: string
    descripcion?: string
    activo: boolean
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number
    label: string
}
