import useExpirationStore from '@inventario/ConfiguracionDeInventario/ProductosConExpiracion/store/expirationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'

export const useExpiration = () => {

    const expirationStore = useExpirationStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'SKU',
                accessorKey: 'sku'
            },
            {
                header: 'Nombre',
                accessorKey: 'nombre',
                cell: ({ row }: any) => {
                    const brand = row.original.nombre
                    const imageUrl = row.original.imagen

                    const avatar =
                        imageUrl != ''
                            ? h('div', { class: 'avatar' }, [
                                  h('div', { class: 'mask mask-squircle h-8 w-8' }, [
                                      h('img', {
                                          src: imageUrl,
                                          alt: 'Brand image'
                                      })
                                  ])
                              ])
                            : h('div', { class: 'avatar' }, [
                                  h(
                                      'div',
                                      { class: 'mask mask-squircle h-8 w-8 bg-secondary-100' },
                                      [
                                          h(
                                              'span',
                                              { class: 'material-symbols-outlined' },
                                              'question_mark'
                                          )
                                      ]
                                  )
                              ])

                    const vnode = h('div', { class: 'flex items-center gap-3' }, [
                        // avatar
                        avatar,

                        // texto
                        h('div', {}, [h('div', { class: 'font-bold' }, brand)])
                    ])
                    return vnode
                }
            },
            {
                header: 'Estado',
                accessorKey: 'estado',
                cell: ({ row }: any) => {
                    const isExpired = row.original.estado
                    return isExpired
                        ? h('span', { class: 'badge badge-sm badge-success' }, 'Expirado')
                        : h('span', { class: 'badge badge-sm badge-error' }, 'No expirado')
                }
            },
            {
                header: 'Fecha de Creación',
                accessorKey: 'fecha_fabricacion'
            },
            {
                header: 'Fecha de Expiración',
                accessorKey: 'fecha_expiracion'
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        expirationStore.setData(data)
                        modalStore.open(expirationStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar producto'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
                }
            }
        ]

        return columns
    }

    return { getTableColumns }
}
