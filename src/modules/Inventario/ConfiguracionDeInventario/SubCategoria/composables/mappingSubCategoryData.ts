import type { 
    SubCategoryResponseType,
    SubCategoryFormType, 
    SubCategoryType, 
    ParentCategoryResponseType,
    ParentCategoryType
} from '@inventario/ConfiguracionDeInventario/SubCategoria/types/subCategoryTypes'

export const mapSubCategory = (model : SubCategoryResponseType) : SubCategoryType => {
    return {
        id: model.id,
        name: model.nombre,
        slug: model.slug,
        status: model.activo,
        parentCateogryName: model.nombreCategoriaPadre,
        parentCategoryId: model.idCategoriaPadre,
        creationDate: model.fechaCreacion,
        imageUrl : model.urlImagen
    }
}

export const mapSubCategoryRequest = (model : SubCategoryFormType) : FormData => {
    const formData = new FormData();

    formData.append("Nombre", model.name);
    formData.append("Slug", model.slug);
    formData.append("IdCategoriaPadre", String(model.parentCategoryId));
    formData.append("Activo", String(model.status)); 
    formData.append("Eliminado", String(false)); 
    formData.append("EliminarImagen", String(model.removeImage));
    if (model.image) formData.append("Imagen", model.image[0]); 

    return formData;
}

export const mapParentCategory = (model : ParentCategoryResponseType) : ParentCategoryType => {
    return {
        id: model.id,
        label: model.nombre
    }
}