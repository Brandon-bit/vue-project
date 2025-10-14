import {
    getInventoryWithdrawalsService,
    getInventoryWithdrawalByIdService,
    getWarehousesService,
    getSuppliersService,
    getProductsBySearchService,
    createInventoryWithdrawalService,
    updateInventoryWithdrawalService
} from '@inventario/Operacion/SalidasDeInventario/services/inventoryWithdrawalsService'
import {
    mapInventoryWithdrawal,
    mapWarehouse,
    mapSupplier,
    mapInventoryWithdrawalRequest,
    mapProduct,
    mapProductDTO
} from '@/modules/Inventario/Operacion/SalidasDeInventario/composables/mappinginventoryWithdrawals'
import {
    InventoryWithdrawalRequest,
    WarehouseDTO,
    SupplierDTO
} from '@inventario/Operacion/SalidasDeInventario/types/inventoryWithdrawalsTypes'
import useInventoryWithdrawalsStore from '@inventario/Operacion/SalidasDeInventario/store/useInventoryWithdrawalsStore'

export const useInventoryWithdrawalsActions = () => {
    const inventoryWithdrawalsStore = useInventoryWithdrawalsStore()

    const getInventoryWithdrawals = async (page: number, pageSize: number) => {
        const response = await getInventoryWithdrawalsService(page, pageSize)
        return {
            items: response.map(mapInventoryWithdrawal),
            total: 10
        }
    }

    const getInventoryWithdrawalById = async (): Promise<any> => {
        const response = await getInventoryWithdrawalByIdService()
        const {
            id,
            almacenId,
            destinoId,
            fecha,
            documentoReferencia,
            estadoId,
            tipoMovimientoId,
            observaciones,
            productos
        } = response
        inventoryWithdrawalsStore.setData({
            id: id,
            warehouseId: almacenId,
            destinationId: destinoId,
            date: fecha,
            observations: observaciones,
            referenceDocument: documentoReferencia,
            movementTypeId: tipoMovimientoId,
            stateId: estadoId
        })
        productos?.forEach((product) => {
            const result = mapProductDTO(product)
            inventoryWithdrawalsStore.addProduct(result)
        })
    }

    const getWarehouses = async (): Promise<WarehouseDTO[]> => {
        const response = await getWarehousesService()
        return response.map(mapWarehouse)
    }

    const getSuppliers = async (): Promise<SupplierDTO[]> => {
        const response = await getSuppliersService()
        return response.map(mapSupplier)
    }

    const getProductsBySearch = async (
        searchWord: string,
        limit: number,
        pageNumber: number
    ): Promise<any> => {
        const response = await getProductsBySearchService(searchWord, limit, pageNumber)
        return response
    }

    const createInventoryWithdrawal = async (data: InventoryWithdrawalRequest) => {
        console.log(data)
        const model = mapInventoryWithdrawalRequest(data)
        model.productos = inventoryWithdrawalsStore.addedProducts.map(mapProduct)
        const response = await createInventoryWithdrawalService(model)

        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const updateInventoryWithdrawal = async (data: InventoryWithdrawalRequest) => {
        const model = mapInventoryWithdrawalRequest(data)
        model.productos = inventoryWithdrawalsStore.addedProducts.map(mapProduct)
        const id = inventoryWithdrawalsStore.selectedInventoryWithdrawal?.id
        const response = await updateInventoryWithdrawalService(model, id)
        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    return {
        getInventoryWithdrawals,
        getInventoryWithdrawalById,
        getWarehouses,
        getSuppliers,
        getProductsBySearch,
        createInventoryWithdrawal,
        updateInventoryWithdrawal
    }
}
