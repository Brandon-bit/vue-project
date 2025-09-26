import { WarrantyResponseType, WarrantyType, WarrantyFormType } from "@inventario/ConfiguracionDeInventario/Garantias/types/warrantyTypes"
import { getWarrantiesService, createWarrantyService, updateWarrantyService, deleteWarrantyService } from "@inventario/ConfiguracionDeInventario/Garantias/services/warrantyServices"
import { mapWarranty, mapWarrantyRequest } from "@inventario/ConfiguracionDeInventario/Garantias/composables/mappingWarrantyData"
import useWarrantyStore from '@inventario/ConfiguracionDeInventario/Garantias/store/warrantyStore'

export function useWarrantyActions() {

    const warrantyStoe = useWarrantyStore()

    const getWarranties = async (page : number, pageSize : number) : Promise<{ items: WarrantyType[], total: number }> => {
        const response = await getWarrantiesService(page, pageSize)
        return {
            items: response.data.items.map(mapWarranty),
            total: response.data.totalItems
        }
    }

    const createWarranty = async (data : WarrantyFormType) : Promise<{ message : string, status : string , data : WarrantyResponseType }> => {
        const model = mapWarrantyRequest(data)
        const response = await createWarrantyService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editWarranty = async (data: WarrantyFormType) : Promise<{ message : string, status : string , data : WarrantyResponseType }> => {
        const model = mapWarrantyRequest(data)
        model.id = warrantyStoe.selectedWarranty?.id
        const response = await updateWarrantyService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }
    
    const deleteWarranty = async () : Promise<{ message : string, status : string , data : WarrantyResponseType }> => {
        let id = warrantyStoe.selectedWarranty?.id
        if(id == undefined) id = 0
        const response = await deleteWarrantyService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

  return { createWarranty, editWarranty, deleteWarranty, getWarranties }
}