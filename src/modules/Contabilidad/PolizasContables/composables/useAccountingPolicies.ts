import useAccountingPoliciesStore from '@/modules/Contabilidad/PolizasContables/store/accountingPoliciesStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { useAccountingPoliciesActions } from '@/modules/Contabilidad/PolizasContables/composables/useAccountingPoliciesActions'
import { showNotification } from '@/utils/toastNotifications'

const useAccountingPolicies = () => {
    const accountingPoliciesStore = useAccountingPoliciesStore()
    const modalStore = useModalStore()
    const { downloadPolicyDocument } = useAccountingPoliciesActions()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Folio',
                accessorKey: 'folio',
                cell: ({ row }: any) => {
                    return h('span', { class: 'font-medium' }, row.original.folio)
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'date',
                cell: ({ row }: any) => {
                    const date = new Date(row.original.date)
                    return h('p', {}, date.toLocaleDateString('es-MX'))
                }
            },
            {
                header: 'Tipo',
                accessorKey: 'type',
                cell: ({ row }: any) => {
                    const typeMap: Record<string, string> = {
                        'Diario': 'badge-neutral',
                        'Ingreso': 'badge-success',
                        'Egreso': 'badge-error'
                    }
                    const badgeClass = typeMap[row.original.type] || 'badge-neutral'
                    return h(
                        'span',
                        { class: `badge ${badgeClass}` },
                        row.original.type
                    )
                }
            },
            {
                header: 'Concepto',
                accessorKey: 'concept',
                cell: ({ row }: any) => {
                    return h('span', { class: 'max-w-md truncate block' }, row.original.concept)
                }
            },
            {
                header: 'Total',
                accessorKey: 'total',
                cell: ({ row }: any) => {
                    const total = row.original.total
                    return h(
                        'span',
                        { class: 'font-mono' },
                        `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                    )
                }
            },
            {
                header: 'Estatus',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const isBalanced = row.original.status === 'Cuadrada'
                    const badgeClass = isBalanced ? 'badge-success' : 'badge-error'
                    const icon = h('span', { class: 'material-symbols-outlined text-xs' }, 
                        isBalanced ? 'check_circle' : 'error'
                    )
                    return h(
                        'span',
                        { class: `badge ${badgeClass} gap-1` },
                        [icon, row.original.status]
                    )
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    
                    // Botón Ver Detalle
                    const detailButton = h(
                        'button',
                        {
                            class: 'btn btn-ghost btn-sm',
                            onClick: () => {
                                accountingPoliciesStore.setData(data)
                                accountingPoliciesStore.setEditMode(false)
                                modalStore.open(accountingPoliciesStore.modalId, {
                                    type: 'DETAIL',
                                    title: 'Detalle de Póliza'
                                })
                            }
                        },
                        [h('span', { class: 'material-symbols-outlined' }, 'visibility')]
                    )
                    
                    // Botón Descargar
                    const downloadButton = h(
                        'button',
                        {
                            class: 'btn btn-ghost btn-sm',
                            onClick: async () => {
                                try {
                                    await downloadPolicyDocument(data.id)
                                    showNotification('Descargando documento de póliza...', 'info')
                                } catch (error) {
                                    showNotification('Error al descargar el documento', 'error')
                                }
                            }
                        },
                        [h('span', { class: 'material-symbols-outlined' }, 'download')]
                    )
                    
                    // Botón Eliminar
                    const deleteButton = h(
                        'button',
                        {
                            class: 'btn btn-ghost btn-sm text-error',
                            onClick: () => {
                                accountingPoliciesStore.setData(data)
                                modalStore.open(accountingPoliciesStore.modalId, {
                                    type: 'DELETE',
                                    title: 'Eliminar póliza'
                                })
                            }
                        },
                        [h('span', { class: 'material-symbols-outlined' }, 'delete')]
                    )
                    
                    return h('div', { class: 'flex gap-2 justify-center' }, [
                        detailButton,
                        downloadButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}

export default useAccountingPolicies
