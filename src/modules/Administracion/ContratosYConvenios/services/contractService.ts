import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { ContractResponseType } from '@/modules/Administracion/ContratosYConvenios/types/contractTypes'

export const getContractsService = async (params?: any): Promise<ApiResponseType<ContractResponseType[]>> => {
    const response = await axiosApiInstance.get('/contratos', { params })
    return response.data
}

export const createContractService = async (data: any): Promise<ApiResponseType<ContractResponseType>> => {
    const response = await axiosApiInstance.post('/contratos', data)
    return response.data
}

export const updateContractService = async (id: string, data: any): Promise<ApiResponseType<ContractResponseType>> => {
    const response = await axiosApiInstance.put(`/contratos/${id}`, data)
    return response.data
}

export const deleteContractService = async (id: string, borradoLogico: boolean = false): Promise<ApiResponseType<ContractResponseType>> => {
    const response = await axiosApiInstance.delete(`/contratos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}
