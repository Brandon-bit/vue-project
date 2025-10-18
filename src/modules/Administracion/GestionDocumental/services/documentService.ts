import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { DocumentResponseType } from '@/modules/Administracion/GestionDocumental/types/documentTypes'

export const getDocumentsService = async (params?: any): Promise<ApiResponseType<DocumentResponseType[]>> => {
    const response = await axiosApiInstance.get('/documentos', { params })
    return response.data
}

export const uploadDocumentService = async (data: FormData): Promise<ApiResponseType<DocumentResponseType>> => {
    const response = await axiosApiInstance.post('/documentos', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const updateDocumentService = async (id: number, data: any): Promise<ApiResponseType<DocumentResponseType>> => {
    const response = await axiosApiInstance.put(`/documentos/${id}`, data)
    return response.data
}

export const deleteDocumentService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<DocumentResponseType>> => {
    const response = await axiosApiInstance.delete(`/documentos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const downloadDocumentService = async (id: number): Promise<Blob> => {
    const response = await axiosApiInstance.get(`/documentos/${id}/descargar`, {
        responseType: 'blob'
    })
    return response.data
}

export const getCategoriesService = async (): Promise<ApiResponseType<any[]>> => {
    const response = await axiosApiInstance.get('/documentos/categorias')
    return response.data
}
