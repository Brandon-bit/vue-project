import { 
    VariantAttributeFormType, 
    VariantAttributeType, 
    VariantAttributeResponseType 
} from '@inventario/ConfiguracionDeInventario/AtributosVariantes/types/variantAttributeTypes';
import useVariantAttributeStore from '@/modules/Inventario/ConfiguracionDeInventario/AtributosVariantes/store/variantAttributeStore';
import { 
    createVariantAttributeService, 
    getVariantAttributesService, 
    updateVariantAttributeService, 
    deleteVariantAttributeService 
} from '@inventario/ConfiguracionDeInventario/AtributosVariantes/services/variantAttributeServices';
import { 
    mapVariantAttribute, 
    mapVariantAttributeRequest 
} from '@inventario/ConfiguracionDeInventario/AtributosVariantes/composables/mappingVariantAttributeData';

export function useVariantAttributeActions() {

    const variantAttributeStore = useVariantAttributeStore()

    const getVariantAttributes = async (page : number, pageSize : number) : Promise<{ items: VariantAttributeType[], total: number }> => {
        const response = await getVariantAttributesService(page, pageSize)
        return {
            items: response.data.items.map(mapVariantAttribute),
            total: response.data.totalItems
        }
    }

    const createVariantAttribute = async (model : VariantAttributeFormType) : Promise<{ message : string, status : string , data : VariantAttributeResponseType }> => {
        const response = await createVariantAttributeService(mapVariantAttributeRequest(model))
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editVariantAttribute = async (model : VariantAttributeFormType) : Promise<{ message : string, status : string , data : VariantAttributeResponseType }> => {
        const id = variantAttributeStore.selectedVariantAttribute.id ?? 0
        const response = await updateVariantAttributeService(id, mapVariantAttributeRequest(model))
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteVariantAttribute = async () : Promise<{ message : string, status : string , data : VariantAttributeResponseType }> => {
        const id = variantAttributeStore.selectedVariantAttribute.id ?? 0
        const response = await deleteVariantAttributeService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

  return { getVariantAttributes, createVariantAttribute, editVariantAttribute, deleteVariantAttribute }
}


