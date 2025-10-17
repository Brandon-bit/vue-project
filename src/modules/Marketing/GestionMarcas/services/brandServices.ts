// src/modules/Marketing/GestionMarcas/services/brandServices.ts

import axiosBackend from '@/api/axiosBackend'; // Asegúrate de usar tu instancia de Axios para el backend
import type { Brand, BrandCreationRequest, SocialAccount } from '../types/brandTypes';

// Reutiliza tu interfaz genérica para las respuestas
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Obtiene la lista de todas las marcas del usuario.
 * @returns Una promesa con la lista de marcas.
 */
export const getBrandsService = async (): Promise<ApiResponse<Brand[]>> => {
  try {
    const response = await axiosBackend.get<Brand[]>('/marcas');
    return { success: true, message: 'Marcas obtenidas.', data: response.data };
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    return { success: false, message: 'No se pudieron cargar las marcas.', data: [] };
  }
};

/**
 * Crea una nueva marca.
 * Llama al endpoint del backend que a su vez crea el perfil en Ayrshare.
 * @param brandData - Los datos para la nueva marca.
 * @returns Una promesa con la marca recién creada.
 */
export const createBrandService = async (brandData: BrandCreationRequest): Promise<ApiResponse<Brand | null>> => {
  try {
    const response = await axiosBackend.post<Brand>('/marcas', brandData);
    return { success: true, message: 'Marca creada con éxito.', data: response.data };
  } catch (error) {
    console.error("Error al crear la marca:", error);
    return { success: false, message: 'No se pudo crear la marca.', data: null };
  }
};

/**
 * Genera el enlace de conexión de Ayrshare para una marca específica.
 * @param brandId - El ID de la marca.
 * @returns Una promesa con la URL de conexión.
 */
export const generateConnectionLinkService = async (brandId: string): Promise<ApiResponse<{ url: string } | null>> => {
  try {
    const response = await axiosBackend.post<{ url: string }>(`/marcas/${brandId}/generate-link`);
    return { success: true, message: 'Enlace generado.', data: response.data };
  } catch (error) {
    console.error("Error al generar el enlace:", error);
    return { success: false, message: 'No se pudo generar el enlace.', data: null };
  }
};

/**
 * Obtiene las redes sociales conectadas para una marca específica.
 * @param brandId - El ID de la marca.
 * @returns Una promesa con la lista de cuentas sociales.
 */
export const getConnectedSocialsService = async (brandId: string): Promise<ApiResponse<SocialAccount[]>> => {
    try {
        const response = await axiosBackend.get<SocialAccount[]>(`/marcas/${brandId}/social-accounts`);
        return { success: true, message: 'Cuentas obtenidas.', data: response.data };
    } catch (error) {
        console.error("Error al obtener las cuentas sociales:", error);
        return { success: false, message: 'No se pudieron obtener las cuentas sociales.', data: [] };
    }
};