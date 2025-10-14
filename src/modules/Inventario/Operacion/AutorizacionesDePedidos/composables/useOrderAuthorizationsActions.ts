import {
    OrderAuthorizationsRecordsTranslatedType,
    OrderAuthorizationPayloadTranslatedType
} from '@inventario/Operacion/AutorizacionesDePedidos/types/orderAuthorizationsTypes'
import {
    mapOrderAuthorizationsRecords,
    mapOrderAuthorizationRecordToBackend
} from '@inventario/Operacion/AutorizacionesDePedidos/composables/mappingOrderAuthorizationsData'
import {
    getOrderAuthorizationsRecordsService,
    updateOrderAuthorizationService
} from '@inventario/Operacion/AutorizacionesDePedidos/services/orderAuthorizationsService'
import useOrderAuthorizationsStore from '@inventario/Operacion/AutorizacionesDePedidos/store/useOrderAthorizationsStore'

export const useOrderAuthorizationsActions = () => {
    const orderAuthorizationsStore = useOrderAuthorizationsStore()

    const getOrderAuthorizationsRecords = async (
        page: number,
        pageSize: number
    ): Promise<{ items: OrderAuthorizationsRecordsTranslatedType[]; total: number }> => {
        const response = await getOrderAuthorizationsRecordsService(page, pageSize)
        return {
            items: response.map(mapOrderAuthorizationsRecords),
            total: 5
        }
    }

    const updateOrderAuthorization = async (
        data: OrderAuthorizationPayloadTranslatedType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapOrderAuthorizationRecordToBackend(data)
        model.id = orderAuthorizationsStore.selectedOderAuthorization?.id
        const response = await updateOrderAuthorizationService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    return {
        getOrderAuthorizationsRecords,
        updateOrderAuthorization
    }
}
