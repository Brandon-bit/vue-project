import type { 
    PermissionResponseType,
    PermissionFormType, 
    PermissionType
} from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

export const mapPermission = (model: PermissionResponseType): PermissionType => {
    return {
        id: model.id,
        type: model.tipo,
        resource: model.recurso,
        applicant: model.solicitante,
        startDate: model.fechaInicio,
        endDate: model.fechaFin,
        status: model.estado,
        reason: model.motivo
    }
}

export const mapPermissionRequest = (model: PermissionFormType) => {
    return {
        Tipo: model.permissionType,
        Recurso: model.resource,
        FechaInicio: model.startDate,
        FechaFin: model.endDate,
        Motivo: model.reason
    }
}
