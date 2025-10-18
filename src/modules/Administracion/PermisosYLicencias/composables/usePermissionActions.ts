import type { PermissionResponseType, PermissionFormType, PermissionType } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'
import usePermissionStore from '@/modules/Administracion/PermisosYLicencias/store/permissionStore'
import { 
    createPermissionService, 
    deletePermissionService, 
    updatePermissionService, 
    getPermissionsService,
    approvePermissionService,
    rejectPermissionService
} from '@/modules/Administracion/PermisosYLicencias/services/permissionService'
import { mapPermission, mapPermissionRequest } from '@/modules/Administracion/PermisosYLicencias/composables/mappingPermissionData'

export const usePermissionActions = () => {
    
    const permissionStore = usePermissionStore()

    const getPermissions = async (params?: any): Promise<PermissionType[]> => {
        const response = await getPermissionsService(params)
        return response.data.map(mapPermission)
    }

    const createPermission = async (data: PermissionFormType): Promise<{ message: string, status: string, data: PermissionResponseType }> => {
        const requestData = mapPermissionRequest(data)
        const response = await createPermissionService(requestData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editPermission = async (data: PermissionFormType): Promise<{ message: string, status: string, data: PermissionResponseType }> => {
        const requestData = mapPermissionRequest(data)
        const id = permissionStore.selectedPermission.id ?? 0
        const response = await updatePermissionService(id, requestData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deletePermission = async (): Promise<{ message: string, status: string, data: PermissionResponseType }> => {
        let id = permissionStore.selectedPermission?.id
        if (id == undefined) id = 0
        const response = await deletePermissionService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const approvePermission = async (id: number): Promise<{ message: string, status: string }> => {
        const response = await approvePermissionService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    const rejectPermission = async (id: number, reason?: string): Promise<{ message: string, status: string }> => {
        const response = await rejectPermissionService(id, reason)
        return {
            message: response.message,
            status: response.success ? "success" : "error"
        }
    }

    return { createPermission, editPermission, deletePermission, getPermissions, approvePermission, rejectPermission }
}
