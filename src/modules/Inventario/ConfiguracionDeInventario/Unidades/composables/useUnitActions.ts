import { UnitType } from './../types/unitType';
import { ApiResponseType } from "@/shared/types/apiResponseType"
export function useUnitActions() {

    const createUnit = async (data : UnitType) : Promise<ApiResponseType<UnitType>> => {
        const response : ApiResponseType<UnitType> = {
            message: "Mensaje Default",
            success: true,
            data: data // la data a retornar sera de la respuesta de la api
        }

        return response
    }

    const editUnit = async (data : UnitType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

    const deleteUnit = async (data : UnitType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

  return { createUnit, editUnit, deleteUnit }
}


