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
        values: data.valor.split(",").map((value) => value.trim()),
        active: data.activo,
        creationDate: data.fechaCreacion
    }
}

export const mapVariantAttributeRequest = (model : VariantAttributeFormType) : VariantAttributeRequestType => {
    return{
        nombre: model.name,
        valor: variantAttributeStore.valuesCopy.join(","),
        activo: model.active
    }
}