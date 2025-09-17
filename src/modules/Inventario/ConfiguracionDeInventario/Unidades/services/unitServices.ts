import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import axiosApiInstance from '@/api/axiosApiInstance'
import { UnitResponseType } from '@inventario/ConfiguracionDeInventario/Unidades/types/unitResponseType';
import { UnitRequestType } from '@inventario/ConfiguracionDeInventario/Unidades/types/unitRequestType';

export const getUnitsService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<UnitResponseType>>> => {
  const response = await axiosApiInstance.get('/unidad/unidad', {
    params: {
      page: page,
      pageSize: pageSize
    }
  })
  return response.data
}

export const createUnitervice = async (data: UnitRequestType): Promise<ApiResponseType<UnitResponseType>> => {
    console.log(data)
    const response = await axiosApiInstance.post('/unidad/unidad', data)
    return response.data
}

export const updateUnitService = async (data: UnitRequestType): Promise<ApiResponseType<UnitResponseType>> => {
    const response = await axiosApiInstance.put(`/unidad/unidad/${data.Id}`, data)
    return response.data
}

export const deleteUnitService = async (id: number, borradoLogico: boolean = true): Promise<ApiResponseType<UnitResponseType>> => {
    const response = await axiosApiInstance.delete(`/unidad/unidad/${id}?borradoLogico=${borradoLogico}`)
    return response.data
}