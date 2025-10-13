import {
    getInventoryEntriesService,
    getInventoryEntyByIdService,
    getWarehousesService,
    getSuppliersService,
    getProductsBySearchService,
    createInventoryEntryService,
    updateInventoryEntryService
} from '@inventario/Operacion/EntradasDeInventario/services/inventoryEntriesService'
import {
    mapInventoryEntry,
    mapWarehouse,
    mapSupplier,
    mapInventoryEntryRequest,
    mapProduct,
    mapProductDTO
} from '@inventario/Operacion/EntradasDeInventario/composables/mappingInventoryEntries'
import {
    InventoryEntryRequest,
    WarehouseDTO,
    SupplierDTO
} from '@inventario/Operacion/EntradasDeInventario/types/inventoryEntriesTypes'
import useInventoryEntriesStore from '@inventario/Operacion/EntradasDeInventario/store/useInventoryEntriesStore'

export const useInventoryEntriesActions = () => {
    const inventoryEntriesStore = useInventoryEntriesStore()

    const getInventoryEntries = async (page: number, pageSize: number) => {
        const response = await getInventoryEntriesService(page, pageSize)
        return {
            items: response.data.items.map(mapInventoryEntry),
            total: response.data.totalItems
        }
    }

    const getInventoryEntryById = async (): Promise<any> => {
        const response = await getInventoryEntyByIdService()
        const {
            id,
            idAlmacen,
            idProveedor,
            fechaEntrada,
            documentoReferencia,
            idEstado,
            idTipoMovimiento,
            observaciones,
            detalles
        } = response
        inventoryEntriesStore.setData({
            id: id,
            warehouseId: idAlmacen,
            supplierId: idProveedor,
            date: fechaEntrada,
            observations: observaciones,
            referenceDocument: documentoReferencia,
            movementTypeId: idTipoMovimiento,
            stateId: idEstado
        })
        detalles?.forEach((product) => {
            const result = mapProductDTO(product)
            inventoryEntriesStore.addProduct(result)
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

    const createInventoryEntry = async (data: InventoryEntryRequest) => {
        const model = mapInventoryEntryRequest(data)
        model.detalles = inventoryEntriesStore.addedProducts.map(mapProduct)
        const response = await createInventoryEntryService(model)

        return {
            message: response.message,
            status: response.success ? 'success' : 'error',
            data: response.data
        }
    }

    const updateInventoryEntry = async (data: InventoryEntryRequest) => {
        console.log(data)

        // const model = mapInventoryEntryRequest(data)
        // model.products = inventoryEntriesStore.addedProducts.map(mapProduct)
        // const id = inventoryEntriesStore.selectedInventoryEntry?.id
        // const response = await updateInventoryEntryService(model, id)
        // return {
        //     message: response.message,
        //     status: response.success ? 'success' : 'error',
        //     data: response.data
        // }
    }

    return {
        getInventoryEntries,
        getInventoryEntryById,
        getWarehouses,
        getSuppliers,
        getProductsBySearch,
        createInventoryEntry,
        updateInventoryEntry
    }
}
