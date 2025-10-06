import { ProductsExpirationType } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/types/expirationTypes'
import { defineStore } from 'pinia'

const initialProductExpiration: ProductsExpirationType = {
    id: undefined,
    sku: '',
    name: '',
    manufacturedDate: '',
    expirationDate: '',
    imageUrl: ''
}

const useExpirationStore = defineStore('expiration-store', {
    state: () => ({
        currentProductExpiration: initialProductExpiration,
        modalId: 'product-expiration-modal'
    }),
    actions: {
        setData(data: ProductsExpirationType = initialProductExpiration) {
            this.currentProductExpiration = data
        }
    }
})

export default useExpirationStore
