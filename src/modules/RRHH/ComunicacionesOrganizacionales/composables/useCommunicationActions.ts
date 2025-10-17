import { mapCommunicationRequest } from '@/modules/RRHH/ComunicacionesOrganizacionales/composables/mappingCommunications'
import {
    CommunicationRequest,
    CommunicationDTO,
    SelectOptionDTO,
    CommunicationStats
} from '@/modules/RRHH/ComunicacionesOrganizacionales/types/communicationTypes'

// Mock data for communications
const mockCommunications: CommunicationDTO[] = [
    {
        id: 1,
        title: 'Bienvenida a Nuevos Empleados - Octubre 2025',
        content:
            'Nos complace dar la bienvenida a todos los nuevos integrantes que se unieron a nuestro equipo este mes. Esperamos que su experiencia sea enriquecedora y que juntos logremos grandes cosas.',
        images: [
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'
        ],
        publicationType: 'publish',
        departments: [],
        createdAt: '2025-10-01T10:00:00',
        active: true,
        createdBy: 'Carlos López'
    },
    {
        id: 2,
        title: 'Actualización de Políticas de Recursos Humanos',
        content:
            'Se han actualizado las políticas de recursos humanos. Por favor, revisen el documento adjunto y confirmen su lectura. Las nuevas políticas entran en vigor el 1 de noviembre.',
        images: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'],
        publicationType: 'departments',
        departments: [2, 3],
        createdAt: '2025-10-05T14:30:00',
        active: true,
        createdBy: 'María García'
    },
    {
        id: 3,
        title: 'Celebración del Día de Muertos',
        content:
            'Los invitamos a participar en nuestra celebración del Día de Muertos. Habrá un altar conmemorativo en el lobby principal y actividades culturales durante la semana.',
        images: [
            'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800',
            'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800',
            'https://images.unsplash.com/photo-1604881991595-2d5e4e8d3e0d?w=800'
        ],
        publicationType: 'publish',
        departments: [],
        createdAt: '2025-10-15T09:00:00',
        active: true,
        createdBy: 'Ana Sánchez'
    },
    {
        id: 4,
        title: 'Capacitación en Nuevas Tecnologías',
        content:
            'El departamento de Tecnología invita a todos los interesados a participar en las sesiones de capacitación sobre las nuevas herramientas que implementaremos. Las sesiones serán virtuales.',
        images: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'],
        publicationType: 'departments',
        departments: [7, 4],
        createdAt: '2025-10-10T11:00:00',
        active: true,
        createdBy: 'Luis Hernández'
    },
    {
        id: 5,
        title: 'Resultados del Tercer Trimestre 2025',
        content:
            'Nos complace compartir los excelentes resultados del tercer trimestre. Gracias al esfuerzo de todos, hemos superado nuestras metas. Felicidades al equipo.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
        publicationType: 'publish',
        departments: [],
        createdAt: '2025-10-08T16:00:00',
        active: true,
        createdBy: 'Roberto Díaz'
    },
    {
        id: 6,
        title: 'Programa de Bienestar Laboral',
        content:
            'Lanzamos nuestro nuevo programa de bienestar laboral que incluye clases de yoga, meditación y asesoría nutricional. Inscripciones abiertas hasta el 30 de octubre.',
        images: [
            'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
            'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
        ],
        publicationType: 'publish',
        departments: [],
        createdAt: '2025-10-12T10:30:00',
        active: true,
        createdBy: 'Patricia Ramírez'
    },
    {
        id: 7,
        title: 'Mantenimiento Programado de Sistemas',
        content:
            'Se realizará mantenimiento programado de los sistemas el próximo sábado de 8:00 AM a 2:00 PM. Durante este tiempo, algunos servicios podrían no estar disponibles.',
        images: [],
        publicationType: 'departments',
        departments: [7],
        createdAt: '2025-10-14T15:00:00',
        active: true,
        createdBy: 'Luis Hernández'
    },
    {
        id: 8,
        title: 'Convocatoria para Vacantes Internas',
        content:
            'Tenemos nuevas oportunidades de crecimiento dentro de la empresa. Consulta las vacantes disponibles en el portal de RH y postúlate antes del 25 de octubre.',
        images: ['https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800'],
        publicationType: 'publish',
        departments: [],
        createdAt: '2025-10-07T12:00:00',
        active: false,
        createdBy: 'Carlos López'
    },
    {
        id: 9,
        title: 'Actualización de Protocolos de Seguridad',
        content:
            'Se han actualizado los protocolos de seguridad en las instalaciones. Todo el personal debe completar la capacitación obligatoria antes del 20 de octubre.',
        images: ['https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'],
        publicationType: 'departments',
        departments: [4, 8],
        createdAt: '2025-10-03T13:30:00',
        active: true,
        createdBy: 'Ana Sánchez'
    },
    {
        id: 10,
        title: 'Cierre de Año Fiscal 2025',
        content:
            'Recordatorio importante: El cierre del año fiscal 2025 será el 31 de diciembre. Por favor, asegúrense de completar todos los reportes y documentación necesaria antes de esa fecha.',
        images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'],
        publicationType: 'departments',
        departments: [3],
        createdAt: '2025-10-11T09:30:00',
        active: true,
        createdBy: 'María García'
    }
]

export const useCommunicationActions = () => {
    const getCommunications = async (
        page: number,
        pageSize: number
    ): Promise<{ items: any[]; total: number }> => {
        console.log('Fetching communications - page:', page, 'pageSize:', pageSize)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/communications?page=${page}&pageSize=${pageSize}`)
        // return response.data

        // Simulate API response with pagination
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedItems = mockCommunications.slice(start, end)

        return {
            items: paginatedItems.map((comm) => ({
                ...comm,
                statusLabel: comm.active ? 'Activo' : 'Inactivo',
                publicationTypeLabel:
                    comm.publicationType === 'publish' ? 'Publicado' : 'Por Departamentos',
                departmentsCount: comm.departments.length,
                createdAtFormatted: new Date(comm.createdAt).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                imagesCount: comm.images.length
            })),
            total: mockCommunications.length
        }
    }

    const getCommunicationById = async (id: number): Promise<CommunicationRequest> => {
        console.log('Fetching communication by id:', id)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/communications/${id}`)
        // return mapCommunicationDTO(response.data)

        // Simulate API response
        const communication = mockCommunications.find((c) => c.id === id)

        if (!communication) {
            throw new Error('Communication not found')
        }

        // Map to request format
        return {
            title: communication.title,
            content: communication.content,
            images: communication.images,
            publicationType: communication.publicationType,
            departments: communication.departments
        }
    }

    const getDepartments = async (): Promise<SelectOptionDTO[]> => {
        // Importar y usar el servicio centralizado de departamentos
        const { useDepartmentActions } = await import('@/modules/RRHH/Departamentos/composables/useDepartmentActions')
        const { getDepartmentsForSelect } = useDepartmentActions()
        return getDepartmentsForSelect()
    }

    const createCommunication = async (data: CommunicationRequest) => {
        const payload = mapCommunicationRequest(data)
        console.log('Creating communication with payload:', payload)

        // TODO: Implement axios call
        // const response = await axiosInstance.post('/communications', payload)
        // return response.data

        return {
            success: true,
            message: 'Comunicado creado exitosamente',
            data: payload
        }
    }

    const updateCommunication = async (id: number, data: CommunicationRequest) => {
        const payload = mapCommunicationRequest(data)
        console.log('Updating communication with id:', id, 'and payload:', payload)

        // TODO: Implement axios call
        // const response = await axiosInstance.put(`/communications/${id}`, payload)
        // return response.data

        return {
            success: true,
            message: 'Comunicado actualizado exitosamente',
            data: payload
        }
    }

    const deleteCommunication = async (id: number) => {
        console.log('Deleting communication with id:', id)

        // TODO: Implement axios call
        // const response = await axiosInstance.delete(`/communications/${id}`)
        // return response.data

        return {
            success: true,
            message: 'Comunicado eliminado exitosamente'
        }
    }

    const getCardsData = async (): Promise<CommunicationStats> => {
        console.log('Fetching communication statistics')

        // TODO: Implement axios call
        // const response = await axiosInstance.get('/communications/stats')
        // return response.data

        // Calculate stats from mock data
        const active = mockCommunications.filter((comm) => comm.active).length

        // Get communications sent this month
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()

        const sentThisMonth = mockCommunications.filter((comm) => {
            const commDate = new Date(comm.createdAt)
            return (
                commDate.getMonth() === currentMonth && commDate.getFullYear() === currentYear
            )
        }).length

        return {
            active,
            sentThisMonth
        }
    }

    return {
        getCommunications,
        getCommunicationById,
        getDepartments,
        createCommunication,
        updateCommunication,
        deleteCommunication,
        getCardsData
    }
}
