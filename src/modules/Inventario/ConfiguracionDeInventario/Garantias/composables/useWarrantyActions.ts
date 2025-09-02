import { ApiResponseType } from "@/shared/types/apiResponseType"
import { WarrantyType } from "../types/warrantyType"

export function useWarrantyActions() {

    const createWarranty = async (data : WarrantyType) : Promise<ApiResponseType<WarrantyType>> => {
        const response : ApiResponseType<WarrantyType> = {
            message: "Mensaje Default",
            success: true,
            data: data
        }

        return response
    }

    const editWarranty = async (data : WarrantyType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

    const deleteWarranty = async (data : WarrantyType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

  return { createWarranty, editWarranty, deleteWarranty }
}