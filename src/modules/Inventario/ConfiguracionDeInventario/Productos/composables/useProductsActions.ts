import useProductsStore from '@inventario/ConfiguracionDeInventario/Productos/store/productsStore'
import { deleteProductService, getProductsService } from '@inventario/ConfiguracionDeInventario/Productos/services/productsServices'
import { mapProduct } from '@inventario/ConfiguracionDeInventario/Productos/composables/mappingProductsData'
import { ProductType, ProductResponseType } from '@inventario/ConfiguracionDeInventario/Productos/types/productsTypes'

export const useProductsActions = () => {

    const productStore = useProductsStore()

    const getProducts = async (page : number, pageSize : number) : Promise<{ items: ProductType[], total: number }> => {
        const response = await getProductsService(page, pageSize)
        return {
            items: response.data.items.map(mapProduct),
            total: response.data.totalItems
        }
    }

    const deleteProduct = async () : Promise<{ message : string, status : string , data : ProductResponseType }> => {
        let id = productStore.selectedProduct?.id
        if(id == undefined) id = 0
        const response = await deleteProductService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const uploadBulkProducts = (data?: any) => {
        console.log(productStore.selectedProduct)
    }

    return { getProducts, deleteProduct, uploadBulkProducts }
}
