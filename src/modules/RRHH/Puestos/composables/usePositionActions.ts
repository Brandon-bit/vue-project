import { mapPositionRequest } from '@/modules/RRHH/Puestos/composables/mappingPosition'
import {
    PositionRequest,
    PositionDTO
} from '@/modules/RRHH/Puestos/types/positionTypes'

// Mock data for simulation
const mockPositions: PositionDTO[] = [
    // Recursos Humanos (departmentId: 1)
    {
        id: 1,
        departmentId: 1,
        departmentName: 'Recursos Humanos',
        name: 'Gerente de RRHH',
        description: 'Responsable de la gestión estratégica del capital humano',
        active: true
    },
    {
        id: 2,
        departmentId: 1,
        departmentName: 'Recursos Humanos',
        name: 'Reclutador',
        description: 'Encargado de procesos de selección y contratación',
        active: true
    },
    {
        id: 3,
        departmentId: 1,
        departmentName: 'Recursos Humanos',
        name: 'Analista de Nómina',
        description: 'Procesamiento y cálculo de nómina',
        active: true
    },
    // Tecnología (departmentId: 2)
    {
        id: 4,
        departmentId: 2,
        departmentName: 'Tecnología',
        name: 'Desarrollador Full Stack',
        description: 'Desarrollo de aplicaciones web frontend y backend',
        active: true
    },
    {
        id: 5,
        departmentId: 2,
        departmentName: 'Tecnología',
        name: 'Arquitecto de Software',
        description: 'Diseño de arquitectura de sistemas y soluciones tecnológicas',
        active: true
    },
    {
        id: 6,
        departmentId: 2,
        departmentName: 'Tecnología',
        name: 'DevOps Engineer',
        description: 'Gestión de infraestructura y despliegues',
        active: true
    },
    // Ventas (departmentId: 3)
    {
        id: 7,
        departmentId: 3,
        departmentName: 'Ventas',
        name: 'Ejecutivo de Ventas',
        description: 'Gestión de cartera de clientes y cierre de ventas',
        active: true
    },
    {
        id: 8,
        departmentId: 3,
        departmentName: 'Ventas',
        name: 'Gerente Comercial',
        description: 'Dirección del equipo de ventas y estrategia comercial',
        active: true
    },
    {
        id: 9,
        departmentId: 3,
        departmentName: 'Ventas',
        name: 'Coordinador de Ventas',
        description: 'Coordinación de actividades del equipo de ventas',
        active: true
    },
    // Marketing (departmentId: 4)
    {
        id: 10,
        departmentId: 4,
        departmentName: 'Marketing',
        name: 'Especialista en Marketing Digital',
        description: 'Gestión de campañas digitales y redes sociales',
        active: true
    },
    {
        id: 11,
        departmentId: 4,
        departmentName: 'Marketing',
        name: 'Community Manager',
        description: 'Gestión de comunidades en redes sociales',
        active: true
    },
    // Finanzas (departmentId: 5)
    {
        id: 12,
        departmentId: 5,
        departmentName: 'Finanzas',
        name: 'Contador General',
        description: 'Registro contable y elaboración de estados financieros',
        active: true
    },
    {
        id: 13,
        departmentId: 5,
        departmentName: 'Finanzas',
        name: 'Analista Financiero',
        description: 'Análisis de indicadores financieros y presupuestos',
        active: true
    },
    {
        id: 14,
        departmentId: 5,
        departmentName: 'Finanzas',
        name: 'Auxiliar Contable',
        description: 'Apoyo en tareas contables y administrativas',
        active: true
    },
    // Operaciones (departmentId: 6)
    {
        id: 15,
        departmentId: 6,
        departmentName: 'Operaciones',
        name: 'Coordinador de Operaciones',
        description: 'Coordinación de procesos operativos',
        active: true
    },
    {
        id: 16,
        departmentId: 6,
        departmentName: 'Operaciones',
        name: 'Analista de Procesos',
        description: 'Análisis y mejora de procesos operativos',
        active: true
    },
    // Administración (departmentId: 7)
    {
        id: 17,
        departmentId: 7,
        departmentName: 'Administración',
        name: 'Asistente Administrativo',
        description: 'Apoyo en gestión administrativa y documentación',
        active: true
    },
    {
        id: 18,
        departmentId: 7,
        departmentName: 'Administración',
        name: 'Recepcionista',
        description: 'Atención a visitantes y gestión de llamadas',
        active: true
    },
    // Logística (departmentId: 8)
    {
        id: 19,
        departmentId: 8,
        departmentName: 'Logística',
        name: 'Coordinador de Logística',
        description: 'Coordinación de cadena de suministro',
        active: true
    },
    {
        id: 20,
        departmentId: 8,
        departmentName: 'Logística',
        name: 'Almacenista',
        description: 'Gestión de inventarios y almacén',
        active: true
    }
]

export const usePositionActions = () => {
    const getPositions = async (
        page: number,
        pageSize: number
    ): Promise<{ items: any[]; total: number }> => {
        console.log('Fetching positions - page:', page, 'pageSize:', pageSize)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/positions?page=${page}&pageSize=${pageSize}`)
        // return response.data

        // Simulate API response with pagination
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedItems = mockPositions.slice(start, end)

        return {
            items: paginatedItems.map((position) => ({
                ...position,
                activeLabel: position.active ? 'Activo' : 'Inactivo'
            })),
            total: mockPositions.length
        }
    }

    const getPositionsByDepartment = async (departmentId: number): Promise<PositionDTO[]> => {
        console.log('getPositionsByDepartment called with departmentId:', departmentId, 'type:', typeof departmentId)
        console.log('All mockPositions:', mockPositions)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/positions/department/${departmentId}`)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Filter positions by department and only return active ones
        const filtered = mockPositions.filter(
            (position) => {
                console.log(`Comparing position.departmentId (${position.departmentId}) === departmentId (${departmentId}):`, position.departmentId === departmentId)
                return position.departmentId === departmentId && position.active
            }
        )
        console.log('Filtered positions result:', filtered)
        return filtered
    }

    const getPositionById = async (id: number): Promise<PositionRequest> => {
        console.log('Fetching position by id:', id)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/positions/${id}`)
        // return mapPositionDTO(response.data)

        // Simulate API response
        const position = mockPositions.find((p) => p.id === id)

        if (!position) {
            throw new Error('Position not found')
        }

        return {
            departmentId: position.departmentId,
            name: position.name,
            description: position.description,
            active: position.active
        }
    }

    const createPosition = async (data: PositionRequest) => {
        const payload = mapPositionRequest(data)
        console.log('Creating position with payload:', payload)

        // TODO: Implement axios call
        // const response = await axiosInstance.post('/positions', payload)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
            success: true,
            message: 'Puesto creado exitosamente',
            status: 'success',
            data: payload
        }
    }

    const updatePosition = async (id: number, data: PositionRequest) => {
        const payload = mapPositionRequest(data)
        console.log('Updating position with id:', id, 'and payload:', payload)

        // TODO: Implement axios call
        // const response = await axiosInstance.put(`/positions/${id}`, payload)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
            success: true,
            message: 'Puesto actualizado exitosamente',
            status: 'success',
            data: payload
        }
    }

    const deletePosition = async (id: number) => {
        console.log('Deleting position with id:', id)

        // TODO: Implement axios call
        // const response = await axiosInstance.delete(`/positions/${id}`)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
            success: true,
            message: 'Puesto eliminado exitosamente',
            status: 'success'
        }
    }

    return {
        getPositions,
        getPositionsByDepartment,
        getPositionById,
        createPosition,
        updatePosition,
        deletePosition
    }
}
