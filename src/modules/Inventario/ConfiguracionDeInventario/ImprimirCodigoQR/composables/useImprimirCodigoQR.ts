import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table'
import type { Product } from '../types/imprimirCodigoQRTypes'

const columnHelper = createColumnHelper<Product>()

export const useImprimirCodigoQR = () => {
    const getProductsTableColumns = (): ColumnDef<Product, any>[] => {
        return [
            columnHelper.accessor('name', {
                header: 'Nombre'
            }),
            columnHelper.accessor('code', {
                header: 'Código'
            }),
            columnHelper.accessor('price', {
                header: 'Precio'
            }),
            columnHelper.accessor('stock', {
                header: 'Stock'
            })
        ]
    }

    return {
        getProductsTableColumns
    }
}
