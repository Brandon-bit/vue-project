import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import { 
    ProductsExpirationResponseType,
    ProductsExpirationRequestType 
} from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/types/expirationTypes'

export const getProductsWithExpirationService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<ProductsExpirationResponseType>>> => {
    const response = await axiosApiInstance.get('/producto/categoria', {
        params: {
        limit: page,
        skip: pageSize
        }
    })
    return response.data
}


export const updateProductWithExpirationService = async (id : number, data: ProductsExpirationRequestType): Promise<ApiResponseType<ProductsExpirationResponseType>> => {
    const response = await axiosApiInstance.put(`/producto/categoria/${id}`, data)
    return response.data
}

export const deleteProductWithExpirationService = async (id: number): Promise<ApiResponseType<ProductsExpirationResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/categoria/${id}`)
    return response.data
}
