import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { BudgetResponseType } from '@/modules/Administracion/Presupuestos/types/budgetTypes'

export const getBudgetsService = async (fiscalYear: number, area?: string): Promise<ApiResponseType<BudgetResponseType[]>> => {
    const response = await axiosApiInstance.get('/presupuestos', {
        params: {
            anioFiscal: fiscalYear,
            area: area !== 'todas' ? area : undefined
        }
    })
    return response.data
}

export const createBudgetService = async (data: any): Promise<ApiResponseType<BudgetResponseType>> => {
    const response = await axiosApiInstance.post('/presupuestos', data)
    return response.data
}

export const updateBudgetService = async (id: number, data: any): Promise<ApiResponseType<BudgetResponseType>> => {
    const response = await axiosApiInstance.put(`/presupuestos/${id}`, data)
    return response.data
}

export const deleteBudgetService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<BudgetResponseType>> => {
    const response = await axiosApiInstance.delete(`/presupuestos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}
