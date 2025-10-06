import type { 
    ProductsExpirationType, 
    ProductsExpirationResponseType,
    ProductsExpirationRequestType,
    ProductsExpirationFormType
} from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/types/expirationTypes'

export const mapProductsWithExpiration = (model: ProductsExpirationResponseType) : ProductsExpirationType => {
    return {
        id: model.id,
        sku: model.sku,
        name: model.nombre,
        manufacturedDate: model.fechaDeCreacion,
        expirationDate: model.fechaDeExpiracion,
        imageUrl: model.imagenUrl
    }
}

export const mapProductsExpirationRequest = (model: ProductsExpirationFormType) : ProductsExpirationRequestType => {
    return {
        fechaDeCreacion: model.manufacturedDate,
        fechaDeExpiracion: model.expirationDate,
    }
}
