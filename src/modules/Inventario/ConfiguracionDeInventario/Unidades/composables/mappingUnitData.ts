import { 
    UnitResponseType, 
    UnitType, 
    UnitFormType, 
    UnitRequestType
} from "@inventario/ConfiguracionDeInventario/Unidades/types/unitTypes"

export const mapUnit = (model : UnitResponseType) : UnitType => {
    return {
        id: model.id,
        name: model.nombre,
        shortName: model.nombreCorto,
        active: model.activo,
        creationDate: model.fechaCreacion,
        productsCount: 0
    }
}

export const mapUnitRequest = (model : UnitFormType) : UnitRequestType => {
    return {
        Nombre: model.name,
        NombreCorto: model.shortName,
        FechaCreacion: new Date().toISOString(),
        FechaActualizacion: new Date().toISOString(),
        Activo: model.active,
        Eliminado: false
    }
}