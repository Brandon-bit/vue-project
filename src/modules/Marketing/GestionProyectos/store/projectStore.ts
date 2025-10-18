import { defineStore } from 'pinia';
import type { Task } from '../types/projectType';

const initialValues: Task = {
  id: '',
  title: '',
  description: '',
  assignee: '',
  priority: 'low',
  status: 'todo',
};

export const useProjectStore = defineStore('project-store', {
  state: () => ({
    selectedTask: { ...initialValues } as Task,
    modalId: 'project-task-modal',
  }),
  actions: {
    setData(data: Task = { ...initialValues }) {
      this.selectedTask = { ...data };
    },
  },
});