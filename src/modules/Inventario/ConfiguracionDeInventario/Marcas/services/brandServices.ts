import axiosApiInstance from '@/api/axiosApiInstance'
import type { ApiResponseType } from '@/shared/types/apiResponseType'
import type { PagedResponseType } from '@/shared/types/pagedResponseType'
import type { BrandResponseType } from '@inventario/ConfiguracionDeInventario/Marcas/types/brandType'

export const getBrandsService = async (page : number, pageSize: number) : Promise<ApiResponseType<PagedResponseType<BrandResponseType>>> => {
    const response = await axiosApiInstance.get('/producto/marca', {
        params: {
            limit: page,
            skip: pageSize
        }
    })
    return response.data
}

export const createBrandService = async (data: FormData): Promise<ApiResponseType<BrandResponseType>> => {
    const response = await axiosApiInstance.post('/producto/marca', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateBrandService = async (id : number, data: FormData): Promise<ApiResponseType<BrandResponseType>> => {
    const response = await axiosApiInstance.put(`/producto/marca/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const deleteBrandService = async (id: number): Promise<ApiResponseType<BrandResponseType>> => {
    const response = await axiosApiInstance.delete(`/producto/marca/${id}`)
    return response.data
}