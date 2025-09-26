import { WarrantyType, WarrantyResponseType, WarrantyFormType, WarrantyRequestType } from "@inventario/ConfiguracionDeInventario/Garantias/types/warrantyTypes"

export const mapWarranty = (model : WarrantyResponseType) : WarrantyType => {
    return {
        id: model.id,
        name: model.nombre,
        duration: Number(model.duracion),
        period: model.periodo,
        description: model.descripcion,
        creationDate: model.fechaCreacion,
        active: model.activo
    }
}

export const mapWarrantyRequest = (model : WarrantyFormType) : WarrantyRequestType => {
    return {
        nombre: model.name,
        duracion: model.duration,
        periodo: model.period,
        descripcion: model.description,
        activo: model.active
    }
}