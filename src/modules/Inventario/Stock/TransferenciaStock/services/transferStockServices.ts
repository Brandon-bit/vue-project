import {  ProductSearchResponse } from '@/modules/Inventario/ConfiguracionDeInventario/Producto/types/productTypes'
import axiosApiInstance from '@/api/axiosApiInstance'
import axiosExamplepInstance from '@/api/axiosExampleInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import { TransferResponseType, TransferRequestType, WarehouseType } from '@/modules/Inventario/Stock/TransferenciaStock/Types/transferStock'

export const getTransferService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<TransferResponseType>>> => {
  const response = await axiosApiInstance.get('/traslado/traslado?page=1&pageSize=10', {
    params: { page, pageSize }
  })
  return response.data
}


export const getTransferById = async( id:string) : Promise<ApiResponseType<PagedResponseType<TransferResponseType>>> =>{
const response = await axiosApiInstance.get(`/traslado/traslado/${id}`)
  return response.data
}

export const createTransferService = async (data: TransferRequestType): Promise<ApiResponseType<TransferResponseType>> => 
{ 
  console.log(data) 
  const response = await axiosApiInstance.post('/traslado/traslado', data);
  return response.data;
};

export const getListWarehouse = async (): Promise<WarehouseType[]> =>
  {const response = await axiosExamplepInstance.get('/warehouses'); return response.data;}


export const searchProductsByName = async (name: string): Promise<ApiResponseType<ProductSearchResponse>> => {
  
    
    const response = await axiosApiInstance.get(`/producto/producto/GetProductoByName/${name}`);
    return response.data;
  
};