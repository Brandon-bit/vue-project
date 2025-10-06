import { 
    ProductsExpirationType, 
    ProductsExpirationFormType,
    ProductsExpirationResponseType 
} from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/types/expirationTypes'
import { 
    mapProductsWithExpiration,
    mapProductsExpirationRequest 
} from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/composables/mappingProductsWithExpirationData'
import { 
    getProductsWithExpirationService,
    updateProductWithExpirationService,
    deleteProductWithExpirationService
 } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/services/expirationService'
import useExpirationStore from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/store/expirationStore'

export const useExpirationActions = () => {

    const expirationStore = useExpirationStore()

    const getProductsWithExpiration = async (page : number, pageSize : number) : Promise<{ items: ProductsExpirationType[], total: number }> => {
        const response = await getProductsWithExpirationService(page, pageSize)
        return {
            items: response.data.items.map(mapProductsWithExpiration),
            total: response.data.totalItems
        }
    }

    const editProductWithExpiration = async (data: ProductsExpirationFormType) : Promise<{ message : string, status : string , data : ProductsExpirationResponseType }> => {
        const model = mapProductsExpirationRequest(data)
        const id = expirationStore.currentProductExpiration.id ?? 0
        const response = await updateProductWithExpirationService(id, model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteProductWithExpiration = async () : Promise<{ message : string, status : string , data : ProductsExpirationResponseType }> => {
        let id = expirationStore.currentProductExpiration?.id
        if(id == undefined) id = 0
        const response = await deleteProductWithExpirationService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }


    return { getProductsWithExpiration, editProductWithExpiration, deleteProductWithExpiration }
}
