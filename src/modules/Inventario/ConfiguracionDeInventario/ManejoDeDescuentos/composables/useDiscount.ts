import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Discount } from '../types/discountTypes'
import { getDiscountsService } from '../services/discountServices'
import useDiscountStore from '../store/discount.store'
import { useDiscountActions } from './useDiscountActions'

const columnHelper = createColumnHelper<Discount>()

export const useDiscount = () => {
    const discountStore = useDiscountStore()
    const { openEditModal, openDeleteModal } = useDiscountActions()

    const getDiscounts = async () => {
        try {
            const discounts = await getDiscountsService()
            discountStore.discounts = discounts
        } catch (error) {
            console.error('Error fetching discounts:', error)
            throw error
        }
    }

    const getDiscountsTableColumns = (): ColumnDef<Discount, any>[] => {
        return [
            columnHelper.accessor('name', {
                header: 'Nombre',
                cell: (info) => info.getValue()
            }),
            columnHelper.accessor('type', {
                header: 'Tipo',
                cell: (info) => {
                    const typeLabels: Record<string, string> = {
                        'PERCENTAGE': 'Porcentaje',
                        'FIXED_AMOUNT': 'Monto Fijo',
                        'VOLUME': 'Por Volumen',
                        'MIN_QUANTITY': 'Cantidad Mínima',
                        'MIN_AMOUNT': 'Monto Mínimo'
                    }
                    return typeLabels[info.getValue()] || info.getValue()
                }
            }),
            columnHelper.accessor('value', {
                header: 'Valor',
                cell: (info) => {
                    const discount = info.row.original
                    if (discount.type === 'PERCENTAGE') {
                        return `${info.getValue()}%`
                    }
                    return `$${info.getValue()}`
                }
            }),
            columnHelper.accessor('status', {
                header: 'Estado',
                cell: (info) => {
                    const statusLabels: Record<string, string> = {
                        'ACTIVE': 'Activo',
                        'INACTIVE': 'Inactivo',
                        'EXPIRED': 'Expirado'
                    }
                    const status = info.getValue()
                    const label = statusLabels[status] || status
                    
                    if (status === 'ACTIVE') {
                        return h('span', { class: 'badge badge-sm badge-success' }, label)
                    } else if (status === 'EXPIRED') {
                        return h('span', { class: 'badge badge-sm badge-error' }, label)
                    } else {
                        return h('span', { class: 'badge badge-sm badge-warning' }, label)
                    }
                }
            }),
            columnHelper.accessor('startDate', {
                header: 'Fecha Inicio',
                cell: (info) => new Date(info.getValue()).toLocaleDateString()
            }),
            columnHelper.accessor('endDate', {
                header: 'Fecha Fin',
                cell: (info) => new Date(info.getValue()).toLocaleDateString()
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Acciones',
                cell: (info) => {
                    const discount = info.row.original
                    
                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        h('div', { class: 'tooltip', 'data-tip': 'Editar' }, [
                            h('button', { 
                                class: 'btn btn-sm btn-outline btn-primary',
                                onClick: () => openEditModal(discount)
                            }, [
                                h('span', { class: 'material-symbols-outlined' }, 'edit')
                            ])
                        ]),
                        h('div', { class: 'tooltip', 'data-tip': 'Eliminar' }, [
                            h('button', { 
                                class: 'btn btn-sm btn-outline btn-error',
                                onClick: () => openDeleteModal(discount)
                            }, [
                                h('span', { class: 'material-symbols-outlined' }, 'delete')
                            ])
                        ])
                    ])
                }
            })
        ]
    }

    return {
        getDiscounts,
        getDiscountsTableColumns
    }
}
