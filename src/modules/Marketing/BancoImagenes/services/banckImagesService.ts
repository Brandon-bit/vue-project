

import axiosExampleInstance from '@/api/axiosExampleInstance';
import type { ImageAssetType, ImageAssetRequest } from '../types/bankImageType';


interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface PaginatedData<T> {
    items: T[];
    totalItems: number;
}

/**
 * Obtiene las imágenes con opciones de búsqueda y filtrado por etiquetas.
 * @param query - Término de búsqueda para el título.
 * @param tags - Array de etiquetas para filtrar.
 * @returns Una promesa con la lista de imágenes.
 */


export const getImagesService = async (query?: string, tags?: string[]): Promise<ApiResponse<PaginatedData<ImageAssetType>>> => {
  try {
    const params = new URLSearchParams();
    if (query) {
      params.append('q', query); // json-server busca en todos los campos de texto
    }
    if (tags && tags.length > 0) {
      tags.forEach(tag => params.append('tags_like', tag)); // Filtra si el tag está en el array 'tags'
    }
    params.append('_sort', 'uploadDate');
    params.append('_order', 'desc');

    const response = await axiosExampleInstance.get<ImageAssetType[]>('/images', { params });
    const totalItems = parseInt(response.headers['x-total-count'] || '0', 10);
    
    return {
      success: true,
      message: 'Imágenes obtenidas correctamente.',
      data: {
        items: response.data,
        totalItems: totalItems
      }
    };
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    return { success: false, message: 'Error al obtener imágenes.', data: { items: [], totalItems: 0 } };
  }
};

/**
 * Sube una nueva imagen y sus metadatos.
 * @param data - FormData con la imagen, título y etiquetas.
 */

export const uploadImageService = async (data: ImageAssetRequest): Promise<ApiResponse<ImageAssetType>> => {

  try {
   
    const response = await axiosExampleInstance.post('/images', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return { success: true, message: 'Imagen subida con éxito.', data: response.data };
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};

/**
 * Actualiza los detalles (título, etiquetas) de una imagen existente.
 * @param id - El ID de la imagen a actualizar.
 * @param data - Objeto con los nuevos datos.
 */


export const updateImageDetailsService = async (id: string, data: { title: string; tags: string[] }): Promise<ApiResponse<ImageAssetType>> => {
    try {
        const response = await axiosExampleInstance.patch(`/images/${id}`, data);
        return { success: true, message: 'Detalles actualizados.', data: response.data };
    } catch (error) {
        console.error("Error al actualizar detalles:", error);
        throw error;
    }
};


/**
 * Elimina una imagen del banco.
 * @param id - El ID de la imagen a eliminar.
 */



export const deleteImageService = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await axiosExampleInstance.delete(`/images/${id}`);
    return { success: true, message: 'Imagen eliminada.', data: null };
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
};