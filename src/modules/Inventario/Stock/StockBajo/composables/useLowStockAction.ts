import { LowStockFormType } from '@/modules/Inventario/Stock/StockBajo/types/lowStockTypes'
export const useLowStockAction = () => {
    const updateLowStockProduct = (data: LowStockFormType) => {
        console.log(data)
    }

    return { updateLowStockProduct }
}
