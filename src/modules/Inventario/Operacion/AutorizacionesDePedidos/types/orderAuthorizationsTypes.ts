export type OrderAuthorizationsRecordsType = {
    id: number
    folio: string
    proveedor: string
    fecha: string
}

export type OrderAuthorizationsRecordsTranslatedType = {
    id: number
    folio: string
    supplier: string
    date: string
}

export type OrderAuthorizationPayloadTranslatedType = {
    id?: number
    type: number
}

export type OrderAuthorizationPayloadType = {
    id?: number
    tipo: number
}
