import { VacationFormDTO, Vacation } from '@rrhh/Vacaciones/types/vacationTypes'
import useVacationStore from '@rrhh/Vacaciones/store/vacationStore'
import { mapVacationDTO, mapVacationRequest } from '@rrhh/Vacaciones/composables/mappingVacations'

// Mock data for demonstration
const mockVacations: Vacation[] = [
    {
        id: 1,
        empleadoId: 101,
        empleadoNombre: 'Juan Pérez García',
        fechaInicio: '2024-12-15',
        fechaFin: '2024-12-22',
        comentarios: 'Vacaciones de fin de año',
        estado: 'aprobada',
        fechaSolicitud: '2024-11-01'
    },
    {
        id: 2,
        empleadoId: 102,
        empleadoNombre: 'María López Hernández',
        fechaInicio: '2024-11-20',
        fechaFin: '2024-11-25',
        comentarios: 'Viaje familiar',
        estado: 'pendiente',
        fechaSolicitud: '2024-10-15'
    },
    {
        id: 3,
        empleadoId: 103,
        empleadoNombre: 'Carlos Ramírez Sánchez',
        fechaInicio: '2024-10-10',
        fechaFin: '2024-10-15',
        comentarios: '',
        estado: 'rechazada',
        fechaSolicitud: '2024-09-20'
    },
    {
        id: 4,
        empleadoId: 104,
        empleadoNombre: 'Ana Martínez Torres',
        fechaInicio: '2025-01-08',
        fechaFin: '2025-01-15',
        comentarios: 'Descanso programado',
        estado: 'pendiente',
        fechaSolicitud: '2024-11-10'
    },
    {
        id: 5,
        empleadoId: 105,
        empleadoNombre: 'Luis González Flores',
        fechaInicio: '2024-12-01',
        fechaFin: '2024-12-07',
        comentarios: 'Asuntos personales',
        estado: 'aprobada',
        fechaSolicitud: '2024-10-25'
    }
]

let nextId = 6

export const useVacationsActions = () => {
    const vacationStore = useVacationStore()

    const getVacations = async (page: number, pageSize: number) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedData = mockVacations.slice(start, end)

        return {
            items: paginatedData.map(mapVacationDTO),
            total: mockVacations.length
        }
    }

    const getVacationById = async (id: number) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        const vacation = mockVacations.find((v) => v.id === id)
        if (!vacation) {
            throw new Error('Vacación no encontrada')
        }

        return mapVacationDTO(vacation)
    }

    const createVacation = async (
        data: VacationFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const model = mapVacationRequest(data)
        const newVacation: Vacation = {
            id: nextId++,
            empleadoId: model.empleadoId,
            empleadoNombre: model.empleadoNombre,
            fechaInicio: model.fechaInicio,
            fechaFin: model.fechaFin,
            comentarios: model.comentarios || '',
            estado: 'pendiente',
            fechaSolicitud: new Date().toISOString().split('T')[0]
        }

        mockVacations.unshift(newVacation)

        return {
            message: 'Solicitud de vacaciones creada exitosamente',
            status: 'success',
            data: mapVacationDTO(newVacation)
        }
    }

    const updateVacation = async (
        data: VacationFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const model = mapVacationRequest(data)
        model.id = vacationStore.selectedVacation?.id

        const index = mockVacations.findIndex((v) => v.id === model.id)
        if (index === -1) {
            return {
                message: 'Vacación no encontrada',
                status: 'error',
                data: null
            }
        }

        const updatedVacation: Vacation = {
            ...mockVacations[index],
            empleadoId: model.empleadoId,
            empleadoNombre: model.empleadoNombre,
            fechaInicio: model.fechaInicio,
            fechaFin: model.fechaFin,
            comentarios: model.comentarios || '',
            estado: model.estado || mockVacations[index].estado
        }

        mockVacations[index] = updatedVacation

        return {
            message: 'Solicitud de vacaciones actualizada exitosamente',
            status: 'success',
            data: mapVacationDTO(updatedVacation)
        }
    }

    const deleteVacation = async (): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = vacationStore.selectedVacation?.id
        if (id === undefined) {
            return {
                message: 'ID de vacación no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockVacations.findIndex((v) => v.id === id)
        if (index === -1) {
            return {
                message: 'Vacación no encontrada',
                status: 'error',
                data: null
            }
        }

        mockVacations.splice(index, 1)

        return {
            message: 'Solicitud de vacaciones eliminada exitosamente',
            status: 'success',
            data: null
        }
    }

    return { getVacations, getVacationById, createVacation, updateVacation, deleteVacation }
}
