import {
    Position,
    PositionDTO,
    PositionRequest,
    PositionRequestPayload
} from '@/modules/RRHH/Puestos/types/positionTypes'

// Map from backend (Spanish) to DTO (English)
export const mapPosition = (data: Position, departmentName: string = ''): PositionDTO => ({
    id: data.id,
    departmentId: data.departamentoId,
    departmentName: departmentName,
    name: data.nombre,
    description: data.descripcion,
    active: data.activo
})

// Map from DTO (English) to backend payload (Spanish)
export const mapPositionRequest = (data: PositionRequest): PositionRequestPayload => ({
    departamentoId: data.departmentId,
    nombre: data.name,
    descripcion: data.description,
    activo: data.active ?? true
})

// Map from backend payload (Spanish) to DTO (English)
export const mapPositionDTO = (data: PositionRequestPayload): PositionRequest => ({
    departmentId: data.departamentoId,
    name: data.nombre,
    description: data.descripcion,
    active: data.activo ?? true
})
