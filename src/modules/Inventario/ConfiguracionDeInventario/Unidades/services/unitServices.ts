import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import { UnitRequestType, UnitResponseType } from '@inventario/ConfiguracionDeInventario/Unidades/types/unitTypes';
import type { PagedResponseType } from '@/shared/types/pagedResponseType'

export const getUnitsService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<UnitResponseType>>> => {
  const response = await axiosApiInstance.get('/producto/unidad', {
    params: {
      limit: page,
      skip: pageSize
    }
  })
  return response.data
}

export const createUnitService = async (data: UnitRequestType): Promise<ApiResponseType<UnitResponseType>> => {
  const response = await axiosApiInstance.post('/producto/unidad', data);
  return response.data;
};

export const updateUnitService = async (data: UnitRequestType): Promise<ApiResponseType<UnitResponseType>> => {
    const response = await axiosApiInstance.put(`/producto/unidad/${data.Id}`, data)
    return response.data
}

export const deleteUnitService = async (id: number, borradoLogico: boolean = true): Promise<ApiResponseType<UnitResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/unidad/${id}?borradoLogico=${borradoLogico}`)
    return response.data
}