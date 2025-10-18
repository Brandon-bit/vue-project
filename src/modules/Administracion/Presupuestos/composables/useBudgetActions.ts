import type { BudgetResponseType, BudgetFormType, BudgetType } from '@/modules/Administracion/Presupuestos/types/budgetTypes'
import useBudgetStore from '@/modules/Administracion/Presupuestos/store/budgetStore'
import { 
    createBudgetService, 
    deleteBudgetService, 
    updateBudgetService, 
    getBudgetsService
} from '@/modules/Administracion/Presupuestos/services/budgetService'
import { mapBudget, mapBudgetRequest } from '@/modules/Administracion/Presupuestos/composables/mappingBudgetData'

export const useBudgetActions = () => {
    
    const budgetStore = useBudgetStore()

    const getBudgets = async (fiscalYear: number, area?: string): Promise<BudgetType[]> => {
        const response = await getBudgetsService(fiscalYear, area)
        return response.data.map(mapBudget)
    }

    const createBudget = async (data: BudgetFormType): Promise<{ message: string, status: string, data: BudgetResponseType }> => {
        const model = mapBudgetRequest(data)
        const response = await createBudgetService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editBudget = async (data: BudgetFormType): Promise<{ message: string, status: string, data: BudgetResponseType }> => {
        const model = mapBudgetRequest(data)
        const id = budgetStore.selectedBudget.id ?? 0
        const response = await updateBudgetService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteBudget = async (): Promise<{ message: string, status: string, data: BudgetResponseType }> => {
        let id = budgetStore.selectedBudget?.id
        if (id == undefined) id = 0
        const response = await deleteBudgetService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    return { createBudget, editBudget, deleteBudget, getBudgets }
}
