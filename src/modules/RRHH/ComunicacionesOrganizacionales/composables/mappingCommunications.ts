import {
    Communication,
    CommunicationDTO,
    CommunicationRequest,
    CommunicationRequestPayload
} from '@/modules/RRHH/ComunicacionesOrganizacionales/types/communicationTypes'

// Map from backend (Spanish) to DTO (English)
export const mapCommunication = (data: Communication): CommunicationDTO => ({
    id: data.id,
    title: data.titulo,
    content: data.contenido,
    images: data.imagenes,
    publicationType: data.tipoPublicacion === 'publicar' ? 'publish' : 'departments',
    departments: data.departamentos,
    createdAt: data.fechaCreacion,
    active: data.activo,
    createdBy: data.creadoPor
})

// Map from DTO (English) to backend payload (Spanish)
export const mapCommunicationRequest = (
    data: CommunicationRequest
): CommunicationRequestPayload => ({
    titulo: data.title,
    contenido: data.content,
    imagenes: data.images,
    tipoPublicacion: data.publicationType === 'publish' ? 'publicar' : 'departamentos',
    departamentos: data.departments
})

// Map from backend payload (Spanish) to DTO (English)
export const mapCommunicationDTO = (data: CommunicationRequestPayload): CommunicationRequest => ({
    title: data.titulo,
    content: data.contenido,
    images: data.imagenes,
    publicationType: data.tipoPublicacion === 'publicar' ? 'publish' : 'departments',
    departments: data.departamentos
})

// Map for table display
export const mapCommunicationForTable = (data: CommunicationDTO) => ({
    ...data,
    statusLabel: data.active ? 'Activo' : 'Inactivo',
    departmentsCount: data.departments.length,
    publicationTypeLabel: data.publicationType === 'publish' ? 'Publicado' : 'Por Departamentos',
    createdAtFormatted: new Date(data.createdAt).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
})
