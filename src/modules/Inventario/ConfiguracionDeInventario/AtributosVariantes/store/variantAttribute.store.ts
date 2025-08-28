import { VariantAttributeValueType } from '../types/variantAttributeValueType';
import { VariantAttributeType } from './../types/variantAttributeType';
import { defineStore } from 'pinia'

const initialUnit : VariantAttributeType = {
    id: undefined,
    name: '',
    values: [] as VariantAttributeValueType[],
    active: true,
    creationDate: new Date(),
}

const useVariantAttributeStore = defineStore('variant-attribute-store', {
    state: () => ({
        variantAttributes: [] as VariantAttributeType[],
        selectedVariantAttribute: initialUnit as VariantAttributeType,
        valuesCopy: [] as VariantAttributeValueType[],
        modalId: 'variant-attribute-modal'
    }),
    actions: {
        setData(data: VariantAttributeType = initialUnit) {
            this.valuesCopy = [...data.values]
            this.selectedVariantAttribute = data
        },
        async removeItemFromUnits(index: number) {
            this.variantAttributes.splice(index, 1)
        }
    }
})

export default useVariantAttributeStore