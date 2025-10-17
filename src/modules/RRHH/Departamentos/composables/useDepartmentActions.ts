import {
    DepartmentDTO,
    DepartmentFormDTO,
    SelectOptionDTO
} from '@/modules/RRHH/Departamentos/types/departmentTypes'
import useDepartmentStore from '@/modules/RRHH/Departamentos/store/departmentStore'
import {
    mapDepartmentToSelectOption
} from '@/modules/RRHH/Departamentos/composables/mappingDepartments'

export const useDepartmentActions = () => {
    const departmentStore = useDepartmentStore()

    // Mock data for departments
    const mockDepartments: DepartmentDTO[] = [
        { id: 1, name: 'Recursos Humanos', description: 'Gestión del talento humano, reclutamiento y desarrollo del personal', active: true },
        { id: 2, name: 'Tecnología', description: 'Desarrollo de software, infraestructura IT y soporte técnico', active: true },
        { id: 3, name: 'Ventas', description: 'Estrategias comerciales y gestión de clientes', active: true },
        { id: 4, name: 'Marketing', description: 'Publicidad, branding y comunicación corporativa', active: true },
        { id: 5, name: 'Finanzas', description: 'Contabilidad, presupuestos y análisis financiero', active: true },
        { id: 6, name: 'Operaciones', description: 'Gestión de procesos operativos y mejora continua', active: false },
        { id: 7, name: 'Administración', description: 'Gestión administrativa y servicios generales', active: true },
        { id: 8, name: 'Logística', description: 'Cadena de suministro, almacenamiento y distribución', active: true },
        { id: 9, name: 'Atención al Cliente', description: 'Servicio al cliente y gestión de experiencias', active: true },
        { id: 10, name: 'Compras', description: 'Adquisiciones, negociación con proveedores y abastecimiento', active: true }
    ]

    const getDepartments = async (
        page: number,
        pageSize: number
    ): Promise<{ items: DepartmentDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockDepartments.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockDepartments.length
        }
    }

    const getDepartmentsForSelect = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Return only active departments for select options
        return mockDepartments
            .filter((dept) => dept.active)
            .map(mapDepartmentToSelectOption)
    }

    const createDepartment = async (
        data: DepartmentFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newDepartment: DepartmentDTO = {
            id: mockDepartments.length + 1,
            name: data.name,
            active: data.active
        }

        mockDepartments.push(newDepartment)

        return {
            message: 'Departamento creado exitosamente',
            status: 'success',
            data: newDepartment
        }
    }

    const updateDepartment = async (
        data: DepartmentFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockDepartments.findIndex((dept) => dept.id === data.id)

        if (index !== -1) {
            mockDepartments[index] = {
                ...mockDepartments[index],
                name: data.name,
                active: data.active
            }

            return {
                message: 'Departamento actualizado exitosamente',
                status: 'success',
                data: mockDepartments[index]
            }
        }

        return {
            message: 'Departamento no encontrado',
            status: 'error',
            data: null
        }
    }

    const deleteDepartment = async (): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = departmentStore.selectedDepartment?.id

        if (!id) {
            return {
                message: 'ID de departamento no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockDepartments.findIndex((dept) => dept.id === id)

        if (index !== -1) {
            const deleted = mockDepartments.splice(index, 1)
            return {
                message: 'Departamento eliminado exitosamente',
                status: 'success',
                data: deleted[0]
            }
        }

        return {
            message: 'Departamento no encontrado',
            status: 'error',
            data: null
        }
    }

    return {
        getDepartments,
        getDepartmentsForSelect,
        createDepartment,
        updateDepartment,
        deleteDepartment
    }
}
