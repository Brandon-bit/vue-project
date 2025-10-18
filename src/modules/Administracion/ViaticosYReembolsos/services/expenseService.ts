import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { ExpenseResponseType } from '@/modules/Administracion/ViaticosYReembolsos/types/expenseTypes'

export const getExpensesService = async (params?: any): Promise<ApiResponseType<ExpenseResponseType[]>> => {
    const response = await axiosApiInstance.get('/viaticos', { params })
    return response.data
}

export const createExpenseService = async (data: any): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.post('/viaticos', data)
    return response.data
}

export const updateExpenseService = async (id: string, data: any): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.put(`/viaticos/${id}`, data)
    return response.data
}

export const deleteExpenseService = async (id: string, borradoLogico: boolean = false): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.delete(`/viaticos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

export const approveExpenseService = async (id: string): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.post(`/viaticos/${id}/aprobar`)
    return response.data
}

export const rejectExpenseService = async (id: string, reason?: string): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.post(`/viaticos/${id}/rechazar`, { razon: reason })
    return response.data
}
