import { ProductsExpirationFormType } from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/types/expirationTypes'

export const useExpirationAction = () => {
    const editProductExpiration = (data: ProductsExpirationFormType) => {
        console.log(data)
    }

    return { editProductExpiration }
}
