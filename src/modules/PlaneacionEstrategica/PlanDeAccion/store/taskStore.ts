import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '../types/taskTypes'

export const useTaskStore = defineStore('task', () => {
    const taskModalId = 'task-modal'
    const selectedTask = ref<Task | null>(null)

    const setTaskData = (data: Task | null = null) => {
        selectedTask.value = data
    }

    return {
        taskModalId,
        selectedTask,
        setTaskData
    }
})

export default useTaskStore
