import {
    OrderAuthorizationsRecordsType,
    OrderAuthorizationPayloadType,
    OrderAuthorizationsRecordsTranslatedType,
    OrderAuthorizationPayloadTranslatedType
} from '@inventario/Operacion/AutorizacionesDePedidos/types/orderAuthorizationsTypes'

export const mapOrderAuthorizationsRecords = (
    data: OrderAuthorizationsRecordsType
): OrderAuthorizationsRecordsTranslatedType => ({
    id: data.id,
    folio: data.folio,
    supplier: data.proveedor,
    date: data.fecha
})

export const mapOrderAuthorizationRecordToBackend = (
    data: OrderAuthorizationPayloadTranslatedType
): OrderAuthorizationPayloadType => ({
    id: data.id,
    tipo: data.type
})
