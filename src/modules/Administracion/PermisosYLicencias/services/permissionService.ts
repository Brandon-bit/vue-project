import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PermissionResponseType } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

export const getPermissionsService = async (params?: any): Promise<ApiResponseType<PermissionResponseType[]>> => {
    const response = await axiosApiInstance.get('/permisos', { params })
    return response.data
}

export const createPermissionService = async (data: any): Promise<ApiResponseType<PermissionResponseType>> => {
    const response = await axiosApiInstance.post('/permisos', data)
    return response.data
}

export const updatePermissionService = async (id: number, data: any): Promise<ApiResponseType<PermissionResponseType>> => {
    const response = await axiosApiInstance.put(`/permisos/${id}`, data)
    return response.data
}

export const deletePermissionService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<PermissionResponseType>> => {
    const response = await axiosApiInstance.delete(`/permisos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const approvePermissionService = async (id: number): Promise<ApiResponseType<PermissionResponseType>> => {
    const response = await axiosApiInstance.post(`/permisos/${id}/aprobar`)
    return response.data
}

export const rejectPermissionService = async (id: number, reason?: string): Promise<ApiResponseType<PermissionResponseType>> => {
    const response = await axiosApiInstance.post(`/permisos/${id}/rechazar`, { razon: reason })
    return response.data
}
