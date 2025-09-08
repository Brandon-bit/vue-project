import { LowStockFormType } from '@inventario/ConfiguracionDeInventario/StockBajo/types/lowStockTypes'
export const useLowStockAction = () => {
    const updateLowStockProduct = (data: LowStockFormType) => {
        console.log(data)
    }

    return { updateLowStockProduct }
}
