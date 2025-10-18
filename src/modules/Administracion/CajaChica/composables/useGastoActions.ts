import type { GastoResponseType, GastoFormType, GastoType, CajaChicaType } from '@/modules/Administracion/CajaChica/types/gastoTypes'
import useGastoStore from '@/modules/Administracion/CajaChica/store/gastoStore'
import { 
    createGastoService, 
    deleteGastoService, 
    updateGastoService, 
    getGastosService,
    aprobarGastoService,
    rechazarGastoService,
    getCajasChicaService
} from '@/modules/Administracion/CajaChica/services/gastoService'
import { mapGasto, mapGastoRequest, mapCajaChica } from '@/modules/Administracion/CajaChica/composables/mappingGastoData'

export const useGastoActions = () => {
    
    const gastoStore = useGastoStore()

    const getGastos = async (page: number, pageSize: number): Promise<{ items: GastoType[], total: number }> => {
        const response = await getGastosService(page, pageSize)
        return {
            items: response.data.items.map(mapGasto),
            total: response.data.totalItems
        }
    }

    const getCajasChica = async (): Promise<CajaChicaType[]> => {
        const response = await getCajasChicaService()
        return response.data.map(mapCajaChica)
    }

    const createGasto = async (data: GastoFormType): Promise<{ message: string, status: string, data: GastoResponseType }> => {
        const model = mapGastoRequest(data)
        const response = await createGastoService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editGasto = async (data: GastoFormType): Promise<{ message: string, status: string, data: GastoResponseType }> => {
        const model = mapGastoRequest(data)
        const id = gastoStore.selectedGasto.id ?? 0
        const response = await updateGastoService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const aprobarGasto = async (): Promise<{ message: string, status: string, data: GastoResponseType }> => {
        const id = gastoStore.selectedGasto?.id ?? 0
        const response = await aprobarGastoService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const rechazarGasto = async (motivo?: string): Promise<{ message: string, status: string, data: GastoResponseType }> => {
        const id = gastoStore.selectedGasto?.id ?? 0
        const response = await rechazarGastoService(id, motivo)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteGasto = async (): Promise<{ message: string, status: string, data: GastoResponseType }> => {
        let id = gastoStore.selectedGasto?.id
        if (id == undefined) id = 0
        const response = await deleteGastoService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    return { createGasto, editGasto, deleteGasto, getGastos, aprobarGasto, rechazarGasto, getCajasChica }
}
