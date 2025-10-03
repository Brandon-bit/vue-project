import { 
    ProductSkuCodeType, 
    ProductSkuCodeRequestType, 
    SkuBarcodeType, 
    SkuBarcodeResponseType 
} from "@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes"

export const mapProductSkuCodeRequestType = (data : ProductSkuCodeType) : ProductSkuCodeRequestType => {
    return {
        idCategoria: data.idCategory,
        idSubCategoria: data.idSubCategory
    }
}

export const mapSkuBarcodeType = (data : SkuBarcodeResponseType) : SkuBarcodeType => {
    return {
        sku: data.sku,
        barcode: data.codigobarras
    }
}
    