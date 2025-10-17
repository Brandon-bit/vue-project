import axiosExampleInstance from '@/api/axiosExampleInstance';
import type { AssetType, AssetRequest, MediaType } from '../types/mediaAssetType';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  items: T[];
  totalItems: number;
}

export const getAssetsService = async (mediaType: MediaType, query?: string, tags?: string[]): Promise<ApiResponse<PaginatedData<AssetType>>> => {
  try {
    const params = new URLSearchParams();
    params.append('mediaType', mediaType);

    if (query) {
      params.append('q', query);
    }
    if (tags && tags.length > 0) {
      tags.forEach(tag => params.append('tags_like', tag));
    }
    params.append('_sort', 'uploadDate');
    params.append('_order', 'desc');

    const response = await axiosExampleInstance.get<AssetType[]>('/images', { params });
    const totalItems = parseInt(response.headers['x-total-count'] || '0', 10);

    return {
      success: true,
      message: 'Activos obtenidos correctamente.',
      data: {
        items: response.data,
        totalItems: totalItems,
      },
    };
  } catch (error) {
    console.error('Error al obtener los activos:', error);
    return { success: false, message: 'Error al obtener activos.', data: { items: [], totalItems: 0 } };
  }
};

export const uploadAssetService = async (data: AssetRequest): Promise<ApiResponse<AssetType>> => {
  try {
    const response = await axiosExampleInstance.post('/images', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return { success: true, message: 'Activo subido con éxito.', data: response.data };
  } catch (error) {
    console.error('Error al subir el activo:', error);
    throw error;
  }
};

export const updateAssetDetailsService = async (id: string, data: { title: string; tags: string[] }): Promise<ApiResponse<AssetType>> => {
  try {
    const response = await axiosExampleInstance.patch(`/images/${id}`, data);
    return { success: true, message: 'Detalles actualizados.', data: response.data };
  } catch (error) {
    console.error('Error al actualizar detalles:', error);
    throw error;
  }
};

export const deleteAssetService = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await axiosExampleInstance.delete(`/images/${id}`);
    return { success: true, message: 'Activo eliminado.', data: null };
  } catch (error) {
    console.error('Error al eliminar el activo:', error);
    throw error;
  }
};