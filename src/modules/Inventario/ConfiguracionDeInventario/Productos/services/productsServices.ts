import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import { productResponseType } from '@inventario/ConfiguracionDeInventario/Productos/types/productsTypes'

export const getProductsService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<productResponseType>>> => {
    const response = await axiosApiInstance.get('/producto/producto', {
        params: {
        limit: page,
        skip: pageSize
        }
    })
    return response.data
}

export const deleteProductService = async (id: number): Promise<ApiResponseType<productResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/producto/${id}`)
    return response.data
}
