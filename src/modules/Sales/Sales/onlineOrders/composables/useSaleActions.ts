import { SaleResponseType, SaleType } from "../types/saleType";
import useSaleStore from '@/modules/Sales/Sales/online-orders/store/saleStore'
import {getSalesService, putSalesService, deleteSalesService} from '../services/sales-services'
import { useSale } from "../composables/useSale";



const { mapSaleRequest } = useSale()

export const useSaleActions = () => {
    const saleStore = useSaleStore()

    const createSale = async (data: SaleResponseType) : Promise<{ message : string, status : string , data : SaleResponseType }> => {
            const model = mapSaleRequest(data)
            const response = await getSalesService(model)
            return {
                message: response,
                status: response.success ? "success" : "error",
                data: response.data
            }
        }
    const editSale = async (data: SaleResponseType) : Promise<{ message : string, status : string , data : SaleResponseType }> => {
            const model = mapSaleRequest(data)
            model.Id = saleStore.selectedSale?.id
            const response = await putSalesService(model)
            return {
                message: response,
                status: response.success ? "success" : "error",
                data: response.data
            }
        }
    const deletSale = async (data: SaleResponseType) : Promise<{ message : string, status : string , data : SaleResponseType }> => {
            let id = saleStore.selectedSale?.id
                    if(id == undefined) id = 0
                    
                    const response = await deleteSalesService(id)
                    return {
                        message: response.message,
                        status: response.success ? "success" : "error",
                        data: response.data
                    }
                }

return { createSale, editSale, deletSale }
}
