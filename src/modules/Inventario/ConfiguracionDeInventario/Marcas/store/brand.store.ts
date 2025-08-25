import { BrandType } from './../types/brandType';
import { defineStore } from 'pinia'

const useBrandStore = defineStore('brand-store', {
    state: () => ({
        editingBrandId: 0,
        brands: []
    }),
})

export default useBrandStore