import { defineStore } from 'pinia'
import { BrandType } from '../types/brandType'

function createEmptyBrand(): BrandType {
  return {
    id: undefined,
    name: '',
    image: undefined,
    active: true,
    creationDate: new Date(),
    imageUrl: '' 
  }
}

const useBrandStore = defineStore('brand-store', {
    state: () => ({
        brands: [],
        currentBrand: null as BrandType | null
    }),
    actions: {
        setCurrentForCreate() {
            this.currentBrand = createEmptyBrand()
        },
        setCurrentForEdit(brand: BrandType) {
            this.currentBrand = { ...brand }
            //console.log(this.currentBrand)
        },
        setCurrentForDelete(brand: BrandType) {
            this.currentBrand = { ...brand }
        },
        async removeItemFromBrands(index: number) {
            this.brands.splice(index, 1)
        }
    }
})

export default useBrandStore