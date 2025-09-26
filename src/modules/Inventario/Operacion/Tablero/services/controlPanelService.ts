import axiosExampleInstance from '@/api/axiosExampleInstance'
import { ControlPanelDataType } from '@inventario/Operacion/Tablero/types/controlPanelTypes'

export const getControlPanelDataService = async (): Promise<ControlPanelDataType[]> => {
    const response = await axiosExampleInstance.get('/controlPanelData')
    return response.data
}
