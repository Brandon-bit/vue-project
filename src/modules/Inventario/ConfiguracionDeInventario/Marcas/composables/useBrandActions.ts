import { ApiResponseType } from "@/shared/types/apiResponseType"
import { BrandType } from "../types/brandType"

export function useBrandActions() {

    const createBrand = async (data : BrandType) : Promise<ApiResponseType<BrandType>> => {
        const response : ApiResponseType<BrandType> = {
            message: "Mensaje Default",
            success: true,
            data: data
        }

        return response
    }

    const editBrand = async (data : BrandType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

    const deleteBrand = async (data : BrandType) : Promise<ApiResponseType<boolean>> => {
        const response : ApiResponseType<boolean> = {
            message: "Mensaje Default",
            success: true,
            data: true
        }

        return response
    }

  return { createBrand, editBrand, deleteBrand }
}


