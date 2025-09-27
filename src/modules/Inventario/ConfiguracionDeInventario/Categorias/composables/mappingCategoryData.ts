import type { 
    CategoryResponseType,
    CategoryFormType, 
    CategoryType 
} from '@inventario/ConfiguracionDeInventario/Categorias/types/categoryTypes'

export const mapCategory = (model : CategoryResponseType) : CategoryType => {
    return {
        id: model.id,
        name: model.nombre,
        slug: model.slug,
        status: model.activo,
        creationDate: model.fechaCreacion,
        imageUrl : model.urlImagen
    }
}

export const mapCategoryRequest = (model : CategoryFormType) : FormData => {
    const formData = new FormData();

    formData.append("Nombre", model.name);
    formData.append("Slug", model.slug);
    formData.append("Activo", String(model.status)); 
    formData.append("Eliminado", String(false)); 
    formData.append("EliminarImagen", String(model.removeImage));
    if (model.image) formData.append("Imagen", model.image[0]); 

    return formData;
}