import {
    VariantAttributeType,
    VariantAttributeFormType,
    VariantAttributeResponseType,
    VariantAttributeRequestType,
} from "@inventario/ConfiguracionDeInventario/AtributosVariantes/types/variantAttributeTypes";
import useVariantAttributeStore from "@inventario/ConfiguracionDeInventario/AtributosVariantes/store/variantAttributeStore";

const variantAttributeStore = useVariantAttributeStore()

export const mapVariantAttribute = (data: VariantAttributeResponseType): VariantAttributeType => {
    return {
        id: data.id,
        name: data.nombre,
        values: data.valores.split(",").map((value) => value.trim()),
        active: data.activo,
        creationDate: data.fechaCreacion
    }
}

export const mapVariantAttributeRequest = (model : VariantAttributeFormType) : VariantAttributeRequestType => {
    return{
        nombre: model.name,
        valores: variantAttributeStore.valuesCopy.join(","),
        activo: model.active
    }
}