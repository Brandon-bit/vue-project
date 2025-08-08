import axios from '../api/axiosInstance';
import type { ApiResponse } from '@/types/ApiResponse';
import type { PagedResponse } from '@/types/PagedResponse';
import type { MProceso } from '@/types/MProceso';
import type { MCVProceso, MCVLvl2 } from '@/types/MCadenaValor';
import type { NuevoProcesoCVRequest, NuevoProcesoRequest } from '@/types/NuevoProceso';


export const getProcesos = async (
  page : number = 1, 
  pageSize : number = 10, 
  nombre : string = "",
  cadenaArea : string = "",
  cadena1 : string = "",
  cadena2 : string = "",
  cadena3 : string = ""
): Promise<ApiResponse<PagedResponse<MProceso>>> => {
  const response = await axios.get('/proceso', { params: {page, pageSize, nombre, cadenaArea, cadena1, cadena2, cadena3}});
  return response.data;
};

/**
 * Crea un nuevo proceso en el sistema
 * @param nuevoProceso Datos del nuevo proceso a crear
 * @returns Respuesta de la API con el resultado de la operación
 */
export const crearNuevoProceso = async (nuevoProceso: NuevoProcesoRequest): Promise<ApiResponse<MProceso>> => {
  const response = await axios.post('/proceso/agregar', nuevoProceso);
  return response.data;
};

/**
 * Crea un nuevo proceso en el sistema
 * @param nuevoProceso Datos del nuevo proceso a crear
 * @returns Respuesta de la API con el resultado de la operación
 */
export const crearNuevoProcesoCV = async (nuevoProceso: NuevoProcesoCVRequest): Promise<ApiResponse<MCVProceso>> => {
  const response = await axios.post('/proceso/agregar-cv', nuevoProceso);
  return response.data;
};

/**
 * Obtiene los grupos de procesos nivel 2 para un nivel 1 específico
 * @param idNivel1 ID del nivel 1 para el cual se requieren los grupos de nivel 2
 * @returns Respuesta de la API con el listado de grupos de nivel 2
 */
export const getNiveles2 = async (idNivel1: number): Promise<ApiResponse<MCVLvl2[]>> => {
  const response = await axios.get(`/proceso/niveles2/${idNivel1}`);
  return response.data;
};

// La función getNiveles3 no es necesaria ya que los niveles 3 vienen incluidos
// en la respuesta de la consulta de niveles 2 dentro de la propiedad lvls3
