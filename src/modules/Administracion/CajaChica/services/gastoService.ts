import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { GastoResponseType, CajaChicaResponseType } from '@/modules/Administracion/CajaChica/types/gastoTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getGastosService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<GastoResponseType>>> => {
    const response = await axiosApiInstance.get('/caja-chica/gastos', {
        params: {
            limit: page,
            skip: pageSize
        }
    })
    return response.data
}

export const getCajasChicaService = async (): Promise<ApiResponseType<CajaChicaResponseType[]>> => {
    const response = await axiosApiInstance.get('/caja-chica/cajas')
    return response.data
}

export const createGastoService = async (data: FormData): Promise<ApiResponseType<GastoResponseType>> => {
    const response = await axiosApiInstance.post('/caja-chica/gastos', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const updateGastoService = async (id: number, data: FormData): Promise<ApiResponseType<GastoResponseType>> => {
    const response = await axiosApiInstance.put(`/caja-chica/gastos/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const aprobarGastoService = async (id: number): Promise<ApiResponseType<GastoResponseType>> => {
    const response = await axiosApiInstance.patch(`/caja-chica/gastos/${id}/aprobar`)
    return response.data
}

export const rechazarGastoService = async (id: number, motivo?: string): Promise<ApiResponseType<GastoResponseType>> => {
    const response = await axiosApiInstance.patch(`/caja-chica/gastos/${id}/rechazar`, { motivo })
    return response.data
}

export const deleteGastoService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<GastoResponseType>> => {
    const response = await axiosApiInstance.delete(`/caja-chica/gastos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}
