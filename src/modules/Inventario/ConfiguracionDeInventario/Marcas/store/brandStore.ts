import { defineStore } from 'pinia'
import { BrandType } from '@inventario/ConfiguracionDeInventario/Marcas/types/brandType'

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
        selectedBrand: initialBrand as BrandType,
        modalId: 'brand-modal'
    }),
    actions: {
        setData(data: BrandType = initialBrand) {
            this.selectedBrand = data
        }
    }
})

export default useBrandStore