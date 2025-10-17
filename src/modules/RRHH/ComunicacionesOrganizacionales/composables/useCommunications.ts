import { h } from 'vue'
import router from '@/router'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { useModalStore } from '@/shared/stores/modal.store'
import { editTableButton, deleteTableButton, detailTableButton } from '@/utils/tableButtons'

export const useCommunications = () => {
    const modalStore = useModalStore()
    const MODAL_ID = 'communication-modal'

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Título',
                accessorKey: 'title',
                cell: ({ row }: any) => {
                    const data = row.original
                    return h(
                        'div',
                        { class: 'max-w-xs truncate font-semibold' },
                        data.title
                    )
                }
            },
            {
                header: 'Tipo',
                accessorKey: 'publicationTypeLabel'
            },
            {
                header: 'Departamentos',
                accessorKey: 'departmentsCount',
                cell: ({ row }: any) => {
                    const data = row.original
                    if (data.publicationType === 'publish') {
                        return h('span', { class: 'badge badge-primary' }, 'Todos')
                    }
                    return h(
                        'span',
                        { class: 'badge badge-secondary' },
                        `${data.departmentsCount} dept.`
                    )
                }
            },
            {
                header: 'Imágenes',
                accessorKey: 'imagesCount',
                cell: ({ row }: any) => {
                    const data = row.original
                    if (data.imagesCount === 0) {
                        return h('span', { class: 'text-base-content/50' }, 'Sin imágenes')
                    }
                    return h(
                        'div',
                        { class: 'flex items-center gap-2' },
                        [
                            h('span', { class: 'material-symbols-outlined text-sm' }, 'image'),
                            h('span', data.imagesCount.toString())
                        ]
                    )
                }
            },
            {
                header: 'Fecha',
                accessorKey: 'createdAtFormatted'
            },
            {
                header: 'Creado por',
                accessorKey: 'createdBy'
            },
            {
                header: 'Estado',
                accessorKey: 'statusLabel',
                cell: ({ row }: any) => {
                    const data = row.original
                    const badgeClass = data.active
                        ? 'badge badge-success'
                        : 'badge badge-error'
                    return h('span', { class: badgeClass }, data.statusLabel)
                }
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const detailAction = () => {
                        modalStore.open(MODAL_ID, {
                            type: 'DETAIL',
                            title: 'Detalle del comunicado',
                            data: data
                        })
                    }
                    const editAction = () => {
                        router.push(`/rrhh/comunicaciones-organizacionales/editar/${data.id}`)
                    }
                    const deleteAction = () => {
                        modalStore.open(MODAL_ID, {
                            type: 'DELETE',
                            title: 'Eliminar comunicado',
                            data: data
                        })
                    }
                    const detailButton = detailTableButton(detailAction)
                    const editButton = editTableButton(editAction)
                    const deleteButton = deleteTableButton(deleteAction)
                    return h('div', { class: 'flex gap-4 justify-center' }, [
                        detailButton,
                        editButton,
                        deleteButton
                    ])
                }
            }
        ]

        return columns
    }

    return { getTableColumns, MODAL_ID }
}
