import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { ExpenseResponseType, PettyBoxResponseType, CutoffResponseType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

// Expenses
export const getExpensesService = async (page: number, pageSize: number): Promise<ApiResponseType<PagedResponseType<ExpenseResponseType>>> => {
    const response = await axiosApiInstance.get('/caja-chica/gastos', {
        params: {
            limit: page,
            skip: pageSize
        }
    })
    return response.data
}

export const getPendingExpensesService = async (): Promise<ApiResponseType<ExpenseResponseType[]>> => {
    const response = await axiosApiInstance.get('/caja-chica/gastos/pendientes')
    return response.data
}

export const createExpenseService = async (data: FormData): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.post('/caja-chica/gastos', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const updateExpenseService = async (id: number, data: FormData): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.put(`/caja-chica/gastos/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const approveExpenseService = async (id: number): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.patch(`/caja-chica/gastos/${id}/aprobar`)
    return response.data
}

export const rejectExpenseService = async (id: number, reason?: string): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.patch(`/caja-chica/gastos/${id}/rechazar`, { motivo: reason })
    return response.data
}

export const deleteExpenseService = async (id: number, borradoLogico: boolean = false): Promise<ApiResponseType<ExpenseResponseType>> => {
    const response = await axiosApiInstance.delete(`/caja-chica/gastos/${id}`, {
        params: { borradoLogico }
    })
    return response.data
}

// Petty Boxes
export const getPettyBoxesService = async (): Promise<ApiResponseType<PettyBoxResponseType[]>> => {
    const response = await axiosApiInstance.get('/caja-chica/cajas')
    return response.data
}

// Cutoffs
export const getCutoffsService = async (): Promise<ApiResponseType<CutoffResponseType[]>> => {
    const response = await axiosApiInstance.get('/caja-chica/cortes')
    return response.data
}

export const generateCutoffService = async (pettyBoxId: number): Promise<ApiResponseType<CutoffResponseType>> => {
    const response = await axiosApiInstance.post('/caja-chica/cortes', { cajaId: pettyBoxId })
    return response.data
}
