import { ProductsExpirationType } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/types/expirationTypes'
import { defineStore } from 'pinia'

const initialProductExpiration: ProductsExpirationType = {
    id: undefined,
    sku: '',
    nombre: '',
    fecha_fabricacion: '',
    fecha_expiracion: '',
    estado: false,
    imagen: ''
}

const useExpirationStore = defineStore('expiration-store', {
    state: () => ({
        productsExpiration: [] as ProductsExpirationType[],
        currentProductExpiration: null as ProductsExpirationType | null,
        modalId: 'product-expiration-modal'
    }),
    actions: {
        setData(data: ProductsExpirationType = initialProductExpiration) {
            this.currentProductExpiration = data
        }
    }
})

export default useExpirationStore
