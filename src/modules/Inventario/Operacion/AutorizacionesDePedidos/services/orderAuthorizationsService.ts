import {
    OrderAuthorizationsRecordsType,
    OrderAuthorizationPayloadType
} from '@inventario/Operacion/AutorizacionesDePedidos/types/orderAuthorizationsTypes'
import axiosExampleInstance from '@/api/axiosExampleInstance'

export const getOrderAuthorizationsRecordsService = async (
    page: number,
    pageSize: number
): Promise<OrderAuthorizationsRecordsType[]> => {
    console.log(page, pageSize)
    const response = await axiosExampleInstance.get('/autorizacionesDePedidos')
    return response.data
}

export const updateOrderAuthorizationService = async (
    data: OrderAuthorizationPayloadType
): Promise<any> => {
    console.log(data)
    // const response = await axiosExampleInstance.put(`/autorizacionesDePedidos/${data.id}`, data)
    // return response.data
}
