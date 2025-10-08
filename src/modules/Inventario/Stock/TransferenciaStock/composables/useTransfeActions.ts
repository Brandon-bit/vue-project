import {getTransferService, createTransferService} from '@/modules/Inventario/Stock/TransferenciaStock/services/transferStockServices'
import type {  TransferFormType, TransferResponseType, TransferType } from '@inventario/Stock/TransferenciaStock/Types/transferStock'
import {mapTransfer, mapTransferRequest} from '@/modules/Inventario/Stock/TransferenciaStock/composables/mappingTransferStock'
import useTransferStore from '@/modules/Inventario/Stock/TransferenciaStock/store/transferStore'

export const useTransferActions = () => {


    const transferStockStore = useTransferStore()
    
    const getTransferStock = async(page:number, pageSize:number) : Promise <{items: TransferType[], total: number}> => {

        const response = await getTransferService(page, pageSize)
        return{

           items: response.data.items.map(mapTransfer),
            total: response.data.totalItems 

        }
    }

    const createTransfer = async (data: TransferFormType) : Promise<{ message: string, status: string, data?: TransferResponseType }> => {
        const model = mapTransferRequest(data)
        const response = await createTransferService(model);

        return {
            message: response.message,  
            status: response.success ? "success" : "error",
            data: response.data
        };
    }

       

    return {getTransferStock, createTransfer}
}



