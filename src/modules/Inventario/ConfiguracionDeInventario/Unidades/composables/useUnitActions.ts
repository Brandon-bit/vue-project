import { UnitFormType, UnitType, UnitResponseType } from '@inventario/ConfiguracionDeInventario/Unidades/types/unitTypes';
import { createUnitService, updateUnitService, deleteUnitService, getUnitsService } from '@inventario/ConfiguracionDeInventario/Unidades/services/unitServices'
import useUnitStore from '@inventario/ConfiguracionDeInventario/Unidades/store/unit.store';
import { mapUnit, mapUnitRequest } from '@inventario/ConfiguracionDeInventario/Unidades/composables/mappingUnitData'

export const useUnitActions = () => {
    const unitStore = useUnitStore()

    const getUnits = async (page : number, pageSize : number) : Promise<{ items: UnitType[], total: number }> => {
        const response = await getUnitsService(page, pageSize)
        return {
            items: response.data.items.map(mapUnit),
            total: response.data.totalItems
        }
    }

    const createUnit = async (data: UnitFormType) : Promise<{ message : string, status : string , data : UnitResponseType }> => {
        const model = mapUnitRequest(data)
        const response = await createUnitService(model)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editUnit = async (data: UnitFormType) : Promise<{ message : string, status : string , data : UnitResponseType }> => {
            const model = mapUnitRequest(data)
            model.Id = unitStore.selectedUnit.id
            const response = await updateUnitService(model)
            return {
                message: response.message,
                status: response.success ? "success" : "error",
                data: response.data
            }
        }

    const deleteUnit = async () : Promise<{ message : string, status : string , data : UnitResponseType }> => {
        let id = unitStore.selectedUnit?.id
        if(id == undefined) id = 0
        const response = await deleteUnitService(id, false)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

  return { getUnits, createUnit, editUnit, deleteUnit }
}


