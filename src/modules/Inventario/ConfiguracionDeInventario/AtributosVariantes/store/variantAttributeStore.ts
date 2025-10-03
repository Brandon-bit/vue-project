import { 
    VariantAttributeType 
} from '@inventario/ConfiguracionDeInventario/AtributosVariantes/types/variantAttributeTypes';
import { defineStore } from 'pinia'

const initialUnit : VariantAttributeType = {
    id: undefined,
    name: '',
    values: [] as string[],
    creationDate: new Date(),
    active: true
}

const useVariantAttributeStore = defineStore('variant-attribute-store', {
    state: () => ({
        selectedVariantAttribute: initialUnit as VariantAttributeType,
        valuesCopy: [] as string[],
        modalId: 'variant-attribute-modal'
    }),
    actions: {
        setData(data: VariantAttributeType = initialUnit) {
            this.valuesCopy = [...data.values]
            this.selectedVariantAttribute = data
        }
    }
})

export default useVariantAttributeStore