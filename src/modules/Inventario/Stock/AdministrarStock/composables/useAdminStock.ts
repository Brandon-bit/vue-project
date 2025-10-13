import useAdminStockStore from '@inventario/Stock/AdministrarStock/store/adminStockStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { ref } from 'vue'
import type { AdminStockType } from '@/modules/Inventario/Stock/AdministrarStock/types/adminStockType'
import type { adminResponseType } from '@inventario/Stock/AdministrarStock/types/adminResponseType'
import type { AdminStockFormType } from '@inventario/Stock/AdministrarStock/types/adminStockFormType'
import type { adminRequestType } from '@inventario/Stock/AdministrarStock/types/adminRequestType'
import { getAdminStockService } from '@inventario/Stock/AdministrarStock/services/adminStockService'

export const useAdminStock = () => {
    const AdminStockStore = useAdminStockStore()
    // const modalStore = useModalStore()

    const getStocks = async (page : number, pageSize : number) : Promise<{ items: AdminStockType[], total: number }> => {
        const response = await getAdminStockService(page, pageSize)
        return {
            items: response.data.items.map(mapAdmin),
            total: response.data.totalItems
        }
    }

    const mapAdmin = (model : adminResponseType) : AdminStockType => {
        return {
            id: model.id,
            idWarehouse: model.idAlmacen,
            idProduct: model.idProducto,
            idMovimiento: model.idMovimiento,
            quantity: model.cantidad,
            unitCost: model.costoUnitario,
            stockAnterior: model.stockAnterior,
            stockResultante: model.stockResultante,
            idUser: model.idUsuario,
            creationDate: model.fechaCreacion,
            updateDate: model.fechaActualizacion,
            activo: model.activo,
            eliminado: model.eliminado
        }
    }

    const mapadminRequest = (model : AdminStockFormType) : adminRequestType => {
        return {
            IdAlmacen: model.idWarehouse,
            IdProducto: model.idProduct,
            IdMovimiento: model.idMovimiento,
            Cantidad: model.quantity,
            CostoUnitario: model.unitCost,
            StockAnterior: model.stockAnterior,
            StockResultante: model.stockResultante,
            IdUsuario: model.idUser,
            FechaActualizacion: model.creationDate,
            FechaCreacion: model.updateDate,
            Activo: model.activo,
            Eliminado: model.eliminado
        }
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Almacen',
                accessorKey: 'idWarehouse'
            },
            {
                header: 'Producto',
                accessorKey: 'idProduct'
            },
            {
                header: 'Cantidad',
                accessorKey: 'quantity'
            }
        ]

        return columns
    }

    return { getTableColumns, mapAdmin, mapadminRequest, getStocks }
}
