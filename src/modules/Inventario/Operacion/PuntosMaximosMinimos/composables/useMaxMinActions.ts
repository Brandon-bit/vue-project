import {
    getMaxMinPointsService,
    createMaxMinPointsService,
    updateMaxMinService,
    deleteMaxMinService
} from '@inventario/Operacion/PuntosMaximosMinimos/services/maxMinService'
import { InventoryFormType } from '@inventario/Operacion/PuntosMaximosMinimos/types/maxMinTypes'
import useMaxMinStore from '@inventario/Operacion/PuntosMaximosMinimos/store/maxMinStore'
import {
    mapRequestData,
    mapResponseData
} from '@inventario/Operacion/PuntosMaximosMinimos/composables/mappingMaxMinData'

export const useMaxMinActions = () => {
    const maxMinStore = useMaxMinStore()

    const getMaxMinPoints = async (page: number, pageSize: number) => {
        const response = await getMaxMinPointsService(page, pageSize)
        return {
            items: response.map(mapResponseData),
            total: 10
        }
    }

    const createMaxMin = async (
        data: InventoryFormType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapRequestData(data)
        const response = await createMaxMinPointsService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const updateMaxMin = async (
        data: InventoryFormType
    ): Promise<{ message: string; status: string; data: any }> => {
        const model = mapRequestData(data)
        model.id = maxMinStore.selectedProduct?.id
        const response = await updateMaxMinService(model)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const deleteMaxMin = async () : Promise<{ message : string, status : string , data : any }> => {
        let id = maxMinStore.selectedProduct?.id
        if(id == undefined) id = 0
        const response = await deleteMaxMinService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    return { getMaxMinPoints, createMaxMin, updateMaxMin, deleteMaxMin }
}
