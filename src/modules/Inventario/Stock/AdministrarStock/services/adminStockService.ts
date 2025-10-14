import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { adminResponseType } from '@inventario/Stock/AdministrarStock/types/adminResponseType'
import type { adminRequestType } from '@inventario/Stock/AdministrarStock/types/adminRequestType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getAdminStockService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<adminResponseType>>> => {
  const response = await axiosApiInstance.get('Movimiento/kardex', {
    params: {
      page: page,
      pageSize: pageSize
    }
  })
  return response.data
}
