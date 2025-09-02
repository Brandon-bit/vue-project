import { UnitType } from './../types/unitType';
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
        units: [] as UnitType[],
        selectedUnit: initialUnit as UnitType,
        modalId: 'unit-modal'
    }),
    actions: {
        setData(data: UnitType = initialUnit) {
            this.selectedUnit = data
        },
        async removeItemFromUnits(index: number) {
            this.units.splice(index, 1)
        }
    }
})

export default useUnitStore