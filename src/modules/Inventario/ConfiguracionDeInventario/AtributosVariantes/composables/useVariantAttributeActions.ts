import { VariantAttributeType } from './../types/variantAttributeType';
import { ApiResponseType } from "@/shared/types/apiResponseType"

export function useVariantAttributeActions() {

    const createVariantAttribute = async (data : VariantAttributeType) : Promise<ApiResponseType<VariantAttributeType>> => {
        const response : ApiResponseType<VariantAttributeType> = {
            message: "Mensaje Default",
            success: true,
            data: data // la data a retornar sera de la respuesta de la api
        }

        return response
    }

    const editVariantAttribute = async (data : VariantAttributeType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

    const deleteVariantAttribute = async (data : VariantAttributeType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

  return { createVariantAttribute, editVariantAttribute, deleteVariantAttribute }
}


