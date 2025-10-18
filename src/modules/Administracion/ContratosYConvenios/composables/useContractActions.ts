import type { ContractResponseType, ContractFormType, ContractType } from '@/modules/Administracion/ContratosYConvenios/types/contractTypes'
import useContractStore from '@/modules/Administracion/ContratosYConvenios/store/contractStore'
import { 
    createContractService, 
    deleteContractService, 
    updateContractService, 
    getContractsService
} from '@/modules/Administracion/ContratosYConvenios/services/contractService'
import { mapContract, mapContractRequest } from '@/modules/Administracion/ContratosYConvenios/composables/mappingContractData'

export const useContractActions = () => {
    
    const contractStore = useContractStore()

    const getContracts = async (params?: any): Promise<ContractType[]> => {
        const response = await getContractsService(params)
        return response.data.map(mapContract)
    }

    const createContract = async (data: ContractFormType): Promise<{ message: string, status: string, data: ContractResponseType }> => {
        const requestData = mapContractRequest(data)
        const response = await createContractService(requestData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editContract = async (data: ContractFormType): Promise<{ message: string, status: string, data: ContractResponseType }> => {
        const requestData = mapContractRequest(data)
        const id = contractStore.selectedContract.id ?? ''
        const response = await updateContractService(id, requestData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteContract = async (): Promise<{ message: string, status: string, data: ContractResponseType }> => {
        let id = contractStore.selectedContract?.id
        if (id == undefined) id = ''
        const response = await deleteContractService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    return { createContract, editContract, deleteContract, getContracts }
}
