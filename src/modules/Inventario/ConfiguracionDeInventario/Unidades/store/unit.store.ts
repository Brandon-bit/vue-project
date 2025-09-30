import { UnitType } from '../types/unitTypes';
import { defineStore } from 'pinia'

const initialUnit: UnitType = {
    id: undefined,
    name: '',
    shortName: '',
    productsCount: 0,
    active: true,
    creationDate: new Date(),
}

const useUnitStore = defineStore('unit-store', {
    state: () => ({
        selectedUnit: initialUnit as UnitType,
        modalId: 'unit-modal'
    }),
    actions: {
        setData(data: UnitType = initialUnit) {
            this.selectedUnit = data
        }
    }
})

export default useUnitStore