import { ApiResponseType } from "@/shared/types/apiResponseType"
import axiosApiInstance from "@/api/axiosApiInstance"
import { DashboardResponseType, ModuleResponseType } from "@core/InSessionLayout/types/inSessionTypes"

export const getDashboardsService = async () : Promise<ApiResponseType<DashboardResponseType[]>> => {
    const response = await axiosApiInstance.get('/dashboard')
    return response.data
}

export const getModulesService = async () : Promise<ApiResponseType<ModuleResponseType[]>> => {
    const response = await axiosApiInstance.get('/modules')
    return response.data
}
