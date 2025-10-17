import { defineStore } from 'pinia'
import { DepartmentDTO } from '@/modules/RRHH/Departamentos/types/departmentTypes'

const initialDepartment: DepartmentDTO = {
    id: undefined,
    name: '',
    description: '',
    active: true
}

const useDepartmentStore = defineStore('department-store', {
    state: () => ({
        departments: [] as DepartmentDTO[],
        selectedDepartment: null as DepartmentDTO | null,
        modalId: 'department-modal'
    }),
    actions: {
        setData(data: DepartmentDTO = initialDepartment) {
            this.selectedDepartment = { ...data }
        }
    }
})

export default useDepartmentStore
