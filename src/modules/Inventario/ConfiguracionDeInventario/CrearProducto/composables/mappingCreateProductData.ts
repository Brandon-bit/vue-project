import { 
    ProductSkuCodeType, 
    ProductSkuCodeRequestType, 
    SkuBarcodeType, 
    SkuBarcodeResponseType,
    CreateVariantFormType,
    CreateProductFormType,
    VariantAttributeType
} from "@inventario/ConfiguracionDeInventario/CrearProducto/types/createProductTypes"
import useCreateProductStore from "@inventario/ConfiguracionDeInventario/CrearProducto/store/createProductStore"

const createProductStore = useCreateProductStore()

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

export const mapVariantAttributeType = (data : CreateVariantFormType) : VariantAttributeType => {
    return {
        idVariant: data.idVariant,
        variantName: createProductStore.variantAttributes.find((variant) => variant.id === data.idVariant)?.label,
        variantValue: data.variantValue,
        variantPrice: data.variantPrice
    }
}

export const mapCreateProductRequest = (data : CreateProductFormType) : FormData => {
    const formData = new FormData();

    formData.append("IdCategoria", data.idCategory);
    formData.append("IdSubcategoria", data.idSubCategory); 
    formData.append("IdMarca", data.idBrand); 
    formData.append("IdUnidad", data.idUnit); 
    formData.append("IdTipoImpuesto", data.singleProduct.idTaxType); 
    formData.append("Nombre", data.name); 
    formData.append("Slug", data.slug); 
    formData.append("Descripcion", data.description); 
    formData.append("PrecioBase", data.singleProduct.price.toString()); 
    formData.append("Activo", String(true)); 
    if (data.image) {
        for (let i = 0; i < data.image.length; i++) {
            const file = data.image[i];
            formData.append("Imagenes", file, file.name);
        }
    }
    if(data.extraInfo.idWarranty) formData.append("InformacionAdicional.IdGarantia", data.extraInfo.idWarranty.toString()); 
    if(data.extraInfo.manufacturingDate) formData.append("InformacionAdicional.FechaFabricacion", data.extraInfo.manufacturingDate.toString()); 
    if(data.extraInfo.expirationDate) formData.append("InformacionAdicional.FechaVencimiento", data.extraInfo.expirationDate.toString()); 

    for(let i = 0; i < createProductStore.variantsData.length; i++){
        const currentVariant = createProductStore.variantsData[i];
        formData.append(`atributosVariante[${i}].Id`, currentVariant.idVariant.toString());
        formData.append(`atributosVariante[${i}].Nombre`, currentVariant.variantName ?? "");
        formData.append(`atributosVariante[${i}].Valor`, currentVariant.variantValue);
    }

    return formData;
}

    