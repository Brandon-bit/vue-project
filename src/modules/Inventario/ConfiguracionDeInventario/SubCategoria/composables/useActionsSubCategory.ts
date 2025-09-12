import { ApiResponseType } from "@/shared/types/apiResponseType"
import { SubCategoryType } from "../types/subCategoryType"

export function useSubCategoryActions() {

    const createSubCategory = async (data: SubCategoryType): Promise<ApiResponseType<SubCategoryType>> => {
        const response: ApiResponseType<SubCategoryType> = {
            message: "Subcategoría creada exitosamente",
            success: true,
            data: data
        }

        return response
    }

    const editSubCategory = async (data: SubCategoryType): Promise<ApiResponseType<boolean>> => {
        const response: ApiResponseType<boolean> = {
            message: "Subcategoría editada exitosamente",
            success: true,
            data: true
        }

        return response
    }

    const deleteSubCategory = async (data: SubCategoryType): Promise<ApiResponseType<boolean>> => {
        const response: ApiResponseType<boolean> = {
            message: "Subcategoría eliminada exitosamente",
            success: true,
            data: true
        }

        return response
    }

    return { createSubCategory, editSubCategory, deleteSubCategory }
}