import { 
    BrandType, 
    BrandFormType, 
    BrandResponseType 
} from "@inventario/ConfiguracionDeInventario/Marcas/types/brandType"

export const mapBrand = (model : BrandResponseType) : BrandType => {
    return {
        id: model.id,
        name: model.nombre,
        creationDate: model.fechaCreacion,
        active: model.activo,
        imageUrl: model.urlLogo
    }
}

export const mapBrandRequest = (model : BrandFormType) : FormData => {
    const formData = new FormData();

    formData.append("Nombre", model.name);
    formData.append("Activo", String(model.active)); 
    formData.append("Eliminado", String(false)); 
    formData.append("EliminarImagen", String(model.removeImage));
    if (model.image) formData.append("Imagen", model.image[0]); 

    return formData;
}