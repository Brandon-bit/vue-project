import { defineStore } from 'pinia'
import type { PermissionType, TabType, PermissionTypeId } from '@/modules/Administracion/PermisosYLicencias/types/permissionTypes'

const initialPermission: PermissionType = {
    id: undefined,
    type: '',
    resource: '',
    applicant: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'Pendiente',
    reason: ''
}

const usePermissionStore = defineStore('permission-store', {
    state: () => ({
        selectedPermission: initialPermission as PermissionType,
        modalId: 'permission-modal',
        activeTab: 'my-requests' as TabType,
        selectedPermissionType: '' as PermissionTypeId | ''
    }),
    actions: {
        setData(data: PermissionType = initialPermission) {
            this.selectedPermission = data
        },
        setActiveTab(tab: TabType) {
            this.activeTab = tab
        },
        setSelectedPermissionType(type: PermissionTypeId | '') {
            this.selectedPermissionType = type
        }
    }
})

export default usePermissionStore
