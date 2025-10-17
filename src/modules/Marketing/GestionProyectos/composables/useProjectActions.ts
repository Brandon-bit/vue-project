import { useProjectStore } from '../store/projectStore';
import type { Task, TaskStatus } from '../types/projectType';
import {
  getTasksService,
  createTaksService,
  updateTaskService,
  deleteTaskService,
} from '../services/projectService';

export const useProjectActions = () => {
  const projectStore = useProjectStore();

  const getTasks = async (query?: string) => {
    const response = await getTasksService(query);
    return {
      items: response.data.items,
      total: response.data.totalItems,
    };
  };

  type TaskFormData = Omit<Task, 'id' | 'status'>;
  
  const createTask = async (data: TaskFormData) => {
    const taskData: Omit<Task, 'id'> = {
      ...data,
      status: 'todo',
    };
    const response = await createTaksService(taskData);
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  type TaskUpdateData = Omit<Task, 'id' | 'status'>;

  const updateTask = async (data: TaskUpdateData) => {
    const id = projectStore.selectedTask.id;
    const response = await updateTaskService(id, data);
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
    const response = await updateTaskService(taskId, { status: newStatus });
     return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  const deleteTask = async () => {
    const id = projectStore.selectedTask.id;
    const response = await deleteTaskService(id);
    return {
      message: response.message,
      status: response.success ? 'success' : 'error',
    };
  };

  return { getTasks, createTask, updateTask, deleteTask, moveTask };
};