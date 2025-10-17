import axiosExampleInstance from '@/api/axiosExampleInstance';
import type { Task, TaskStatus } from '../types/projectType';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  items: T[];
  totalItems: number;
}

export const getTasksService = async (query?: string): Promise<ApiResponse<PaginatedData<Task>>> => {
  try {
    const params = new URLSearchParams();
    if (query) {
      params.append('q', query);
    }
    params.append('_sort', 'uploadDate');
    params.append('_order', 'desc');

    const response = await axiosExampleInstance.get<Task[]>('/tasks', { params });
    const totalItems = parseInt(response.headers['x-total-count'] || '0', 10);

    return {
      success: true,
      message: 'Tareas obtenidas correctamente.',
      data: {
        items: response.data,
        totalItems: totalItems,
      },
    };
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return { success: false, message: 'Error al obtener tareas.', data: { items: [], totalItems: 0 } };
  }
};

type TaskCreationData = Omit<Task, 'id'>;

export const createTaksService = async (data: TaskCreationData): Promise<ApiResponse<Task>> => {
  try {
    const response = await axiosExampleInstance.post('/tasks', data);
    return { success: true, message: 'Tarea creada con éxito.', data: response.data };
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    throw error;
  }
};

export const updateTaskService = async (id: string, data: Partial<Task>): Promise<ApiResponse<Task>> => {
  try {
    const response = await axiosExampleInstance.patch(`/tasks/${id}`, data);
    return { success: true, message: 'Tarea actualizada.', data: response.data };
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
};

export const deleteTaskService = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await axiosExampleInstance.delete(`/tasks/${id}`);
    return { success: true, message: 'Tarea eliminada.', data: null };
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
};