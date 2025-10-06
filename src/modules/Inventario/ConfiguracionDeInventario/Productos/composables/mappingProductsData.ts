import {
    ProductResponseType,
    ProductType
} from '@inventario/ConfiguracionDeInventario/Productos/types/productsTypes'

export const mapProduct = (model : ProductResponseType) : ProductType => {
    return {
        id: model.id,
        name: model.nombre,
        sku: model.sku,
        categoryId: model.idCategoria,
        categoryName: '',
        brandId: model.idMarca,
        brandName: '',
        price: model.precioBase,
        unitId: model.idUnidad,
        unitName: '',
        quantity: model.idUnidad,
        urlImage: ''
    }
}