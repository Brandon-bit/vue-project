

import axiosExampleInstance from '@/api/axiosExampleInstance';
import type { SocialPost, SocialPostRequest } from '../types/socialPostTypes';


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
 * Obtiene una lista paginada de publicaciones.
 * @param page - El número de página a solicitar.
 * @param pageSize - El número de elementos por página.
 * @returns Una promesa que resuelve a un objeto con los items y el total.
 */
export const getPostsService = async (
    page: number, 
    pageSize: number
): Promise<ApiResponse<PaginatedData<SocialPost>>> => {
    try {
        
        const response = await axiosExampleInstance.get<SocialPost[]>('/socialPosts', {
            params: {
                _page: page,
                _limit: pageSize,
                _sort: 'date', // Ordena por fecha para mostrar los más recientes
                _order: 'desc'
            }
        });

        const totalItems = parseInt(response.headers['x-total-count'] || '0', 10);

        return {
            success: true,
            message: 'Publicaciones obtenidas exitosamente.',
            data: {
                items: response.data,
                totalItems: totalItems
            }
        };
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
       
        return {
            success: false,
            message: 'No se pudieron obtener las publicaciones.',
            data: { items: [], totalItems: 0 }
        };
    }
};

/**
 * Crea una nueva publicación.
 * @param postData - FormData con los datos de la nueva publicación.
 * @returns Una promesa que resuelve a la respuesta de la API.
 */


export const createPostService = async (
    postData: SocialPostRequest
): Promise<ApiResponse<SocialPost>> => {
    try {
        const response = await axiosExampleInstance.post<SocialPost>('/socialPosts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Importante para el envío de archivos
            }
        });
        return {
            success: true,
            message: 'Publicación creada exitosamente.',
            data: response.data
        };
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        throw error; // Lanza el error para que sea manejado por el composable
    }
};

/**
 * Actualiza una publicación existente.
 * @param id - El ID de la publicación a actualizar.
 * @param postData - FormData con los datos actualizados.
 * @returns Una promesa que resuelve a la respuesta de la API.
 */
export const updatePostService = async (
    id: string, 
    postData: SocialPostRequest
): Promise<ApiResponse<SocialPost>> => {
    try {
       
        const response = await axiosExampleInstance.put<SocialPost>(`/socialPosts/${id}`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return {
            success: true,
            message: 'Publicación actualizada exitosamente.',
            data: response.data
        };
    } catch (error) {
        console.error(`Error al actualizar la publicación con ID ${id}:`, error);
        throw error;
    }
};

/**
 * Elimina una publicación.
 * @param id - El ID de la publicación a eliminar.
 * @returns Una promesa que resuelve a la respuesta de la API.
 */
export const deletePostService = async (id: string): Promise<ApiResponse<null>> => {
    try {
        await axiosExampleInstance.delete(`/socialPosts/${id}`);
        return {
            success: true,
            message: 'Publicación eliminada exitosamente.',
            data: null
        };
    } catch (error) {
        console.error(`Error al eliminar la publicación con ID ${id}:`, error);
        throw error;
    }
};