import { defineStore } from 'pinia'
import { BrandType } from '../types/brandType'

const initialBrand: BrandType = {
    id: undefined,
    name: '',
    image: undefined,
    active: true,
    creationDate: new Date(),
    imageUrl: '' 
}

const useBrandStore = defineStore('brand-store', {
    state: () => ({
        brands: [] as BrandType[],
        selectedBrand: initialBrand as BrandType,
        modalId: 'brand-modal'
    }),
    actions: {
        setData(data: BrandType = initialBrand) {
            this.selectedBrand = data
        },
        async removeItemFromBrands(index: number) {
            this.brands.splice(index, 1)
        }
    }
})

export default useBrandStore