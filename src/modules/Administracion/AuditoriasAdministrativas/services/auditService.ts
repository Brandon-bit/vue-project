import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { Audit, Finding } from '../types/auditTypes'

// Servicios de Auditorías
export const getAuditsService = async (params?: any): Promise<ApiResponseType<Audit[]>> => {
    const response = await axiosApiInstance.get('/auditorias', { params })
    return response.data
}

export const createAuditService = async (data: any): Promise<ApiResponseType<Audit>> => {
    const response = await axiosApiInstance.post('/auditorias', data)
    return response.data
}

export const updateAuditService = async (id: number, data: any): Promise<ApiResponseType<Audit>> => {
    const response = await axiosApiInstance.put(`/auditorias/${id}`, data)
    return response.data
}

export const deleteAuditService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<Audit>> => {
    const response = await axiosApiInstance.delete(`/auditorias/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

// Servicios de Hallazgos
export const getFindingsService = async (params?: any): Promise<ApiResponseType<Finding[]>> => {
    const response = await axiosApiInstance.get('/hallazgos', { params })
    return response.data
}

export const createFindingService = async (data: any): Promise<ApiResponseType<Finding>> => {
    const response = await axiosApiInstance.post('/hallazgos', data)
    return response.data
}

export const updateFindingService = async (id: number, data: any): Promise<ApiResponseType<Finding>> => {
    const response = await axiosApiInstance.put(`/hallazgos/${id}`, data)
    return response.data
}

export const deleteFindingService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<Finding>> => {
    const response = await axiosApiInstance.delete(`/hallazgos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}
