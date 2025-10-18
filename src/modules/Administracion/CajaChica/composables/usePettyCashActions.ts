import type { ExpenseResponseType, ExpenseFormType, ExpenseType, PettyBoxType, CutoffType } from '@/modules/Administracion/CajaChica/types/pettycashTypes'
import usePettyCashStore from '@/modules/Administracion/CajaChica/store/pettycashStore'
import { 
    createExpenseService, 
    deleteExpenseService, 
    updateExpenseService, 
    getExpensesService,
    getPendingExpensesService,
    approveExpenseService,
    rejectExpenseService,
    getPettyBoxesService,
    getCutoffsService,
    generateCutoffService
} from '@/modules/Administracion/CajaChica/services/pettycashService'
import { mapExpense, mapExpenseRequest, mapPettyBox, mapCutoff } from '@/modules/Administracion/CajaChica/composables/mappingPettyCashData'

export const usePettyCashActions = () => {
    
    const pettyCashStore = usePettyCashStore()

    const getExpenses = async (page: number, pageSize: number): Promise<{ items: ExpenseType[], total: number }> => {
        const response = await getExpensesService(page, pageSize)
        return {
            items: response.data.items.map(mapExpense),
            total: response.data.totalItems
        }
    }

    const getPendingExpenses = async (): Promise<ExpenseType[]> => {
        const response = await getPendingExpensesService()
        return response.data.map(mapExpense)
    }

    const getPettyBoxes = async (): Promise<PettyBoxType[]> => {
        const response = await getPettyBoxesService()
        return response.data.map(mapPettyBox)
    }

    const getCutoffs = async (): Promise<CutoffType[]> => {
        const response = await getCutoffsService()
        return response.data.map(mapCutoff)
    }

    const createExpense = async (data: ExpenseFormType): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        const model = mapExpenseRequest(data)
        const response = await createExpenseService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editExpense = async (data: ExpenseFormType): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        const model = mapExpenseRequest(data)
        const id = pettyCashStore.selectedExpense.id ?? 0
        const response = await updateExpenseService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const approveExpense = async (): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        const id = pettyCashStore.selectedExpense?.id ?? 0
        const response = await approveExpenseService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const rejectExpense = async (reason?: string): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        const id = pettyCashStore.selectedExpense?.id ?? 0
        const response = await rejectExpenseService(id, reason)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteExpense = async (): Promise<{ message: string, status: string, data: ExpenseResponseType }> => {
        let id = pettyCashStore.selectedExpense?.id
        if (id == undefined) id = 0
        const response = await deleteExpenseService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const generateCutoff = async (pettyBoxId: number): Promise<{ message: string, status: string }> => {
        const response = await generateCutoffService(pettyBoxId)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    return { 
        createExpense, 
        editExpense, 
        deleteExpense, 
        getExpenses, 
        getPendingExpenses,
        approveExpense, 
        rejectExpense, 
        getPettyBoxes,
        getCutoffs,
        generateCutoff
    }
}
