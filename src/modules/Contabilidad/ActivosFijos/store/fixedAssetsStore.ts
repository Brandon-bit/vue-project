import { defineStore } from 'pinia'
import type { FixedAssetType } from '@/modules/Contabilidad/ActivosFijos/types/fixedAssetsTypes'

const initialFixedAsset: FixedAssetType = {
    id: undefined,
    description: '',
    brand: '',
    model: '',
    serialNumber: '',
    acquisitionDate: '',
    supplier: '',
    invoice: '',
    originalValue: 0,
    usefulLife: 60,
    accountingAccount: '',
    physicalLocation: '',
    area: '',
    responsible: '',
    notes: '',
    status: 'Activo',
    creationDate: new Date()
}

const useFixedAssetsStore = defineStore('fixed-assets-store', {
    state: () => ({
        selectedFixedAsset: initialFixedAsset as FixedAssetType,
        modalId: 'fixed-assets-modal'
    }),
    actions: {
        setData(data: FixedAssetType = initialFixedAsset) {
            this.selectedFixedAsset = data
        }
    }
})

export default useFixedAssetsStore
