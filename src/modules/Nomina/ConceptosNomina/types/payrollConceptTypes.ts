// Backend response type (español)
export type PayrollConcept = {
    id?: number
    nombre: string
    clave: string
    tipo: 'percepcion' | 'deduccion'
    descripcion?: string
    esVariable: boolean
    montoFijo?: number
    porcentaje?: number
    aplicaISR: boolean
    aplicaIMSS: boolean
    activo: boolean
}

// Frontend DTO type (inglés)
export type PayrollConceptDTO = {
    id?: number
    name: string
    code: string
    type: 'percepcion' | 'deduccion'
    description?: string
    isVariable: boolean
    fixedAmount?: number
    percentage?: number
    appliesISR: boolean
    appliesIMSS: boolean
    active: boolean
}

// Form type for create/update
export type PayrollConceptFormDTO = {
    id?: number
    name: string
    code: string
    type: 'percepcion' | 'deduccion'
    description?: string
    isVariable: boolean
    fixedAmount?: number
    percentage?: number
    appliesISR: boolean
    appliesIMSS: boolean
    active: boolean
}

// Request type to backend
export type PayrollConceptRequest = {
    id?: number
    nombre: string
    clave: string
    tipo: 'percepcion' | 'deduccion'
    descripcion?: string
    esVariable: boolean
    montoFijo?: number
    porcentaje?: number
    aplicaISR: boolean
    aplicaIMSS: boolean
    activo: boolean
}

// Select option type for dropdowns
export type SelectOptionDTO = {
    id: number
    label: string
    type?: 'percepcion' | 'deduccion'
}
