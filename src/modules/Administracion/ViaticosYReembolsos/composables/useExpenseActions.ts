import type { ExpenseResponseType, ExpenseFormType, ExpenseType } from '@/modules/Administracion/ViaticosYReembolsos/types/expenseTypes'
import useExpenseStore from '@/modules/Administracion/ViaticosYReembolsos/store/expenseStore'
import { 
    createExpenseService, 
    deleteExpenseService, 
    updateExpenseService, 
    getExpensesService,
    approveExpenseService,
    rejectExpenseService
} from '@/modules/Administracion/ViaticosYReembolsos/services/expenseService'
import { mapExpense, mapExpenseRequest } from '@/modules/Administracion/ViaticosYReembolsos/composables/mappingExpenseData'

export const useExpenseActions = () => {
    
    const expenseStore = useExpenseStore()

    const getExpenses = async (params?: any): Promise<ExpenseType[]> => {
        const response = await getExpensesService(params)
        return response.data.map(mapExpense)
    }

    const createExpense = async (data: ExpenseFormType): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        const requestData = mapExpenseRequest(data)
        const response = await createExpenseService(requestData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editExpense = async (data: ExpenseFormType): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        const requestData = mapExpenseRequest(data)
        const id = expenseStore.selectedExpense.id ?? ''
        const response = await updateExpenseService(id, requestData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteExpense = async (): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        let id = expenseStore.selectedExpense?.id
        if (id == undefined) id = ''
        const response = await deleteExpenseService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const approveExpense = async (id: string): Promise<{ message: string, status: string }> => {
        const response = await approveExpenseService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const rejectExpense = async (id: string, reason?: string): Promise<{ message: string, status: string }> => {
        const response = await rejectExpenseService(id, reason)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    return { createExpense, editExpense, deleteExpense, getExpenses, approveExpense, rejectExpense }
}
