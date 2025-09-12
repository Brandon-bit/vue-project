import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table'
import type { Product } from '../types/imprimirCodigoDeBarrasTypes'

const columnHelper = createColumnHelper<Product>()

export const useImprimirCodigoDeBarras = () => {
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
