export type VariantAttributeType = {
    id?: number
    name: string
    values: string[]
    creationDate: Date
    active: boolean
}

export type VariantAttributeValueType = {
    id?: number
    value: string
}

export type VariantAttributeFormType = {
    name: string
    values: string[]
    active: boolean
}

export type VariantAttributeRequestType = {
    nombre: string
    valor: string
    activo: boolean
}

export type VariantAttributeResponseType = {
    id: number
    nombre: string
    valor: string
    fechaCreacion: Date
    activo: boolean
}

