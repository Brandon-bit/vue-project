import { getLowStockService } from '@/modules/Inventario/Stock/StockBajo/services/lowStockService'
import useLowStockStore from '@inventario/Stock/StockBajo/store/lowStockStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton } from '@/utils/tableButtons'
export const useLowStock = () => {
    const lowStockStore = useLowStockStore()
    const modalStore = useModalStore()
    const getLowStock = async () => {
        const response = await getLowStockService()
        lowStockStore.lowStock = response
    }

    const getTableColumns = (): ColumnTableType[] => {
        const columns = [
            {
                header: 'Almacén',
                accessorKey: 'almacen'
            },
            {
                header: 'Tienda',
                accessorKey: 'tienda'
            },
            {
                header: 'Producto',
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
                                          alt: 'image'
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
                header: 'Categoría',
                accessorKey: 'categoria'
            },
            {
                header: 'SKU',
                accessorKey: 'sku'
            },
            {
                header: 'Cantidad',
                accessorKey: 'cantidad'
            },
            {
                header: 'Cantidad Alerta',
                accessorKey: 'cantidadAlerta'
            },
            {
                header: 'Acciones',
                accessorKey: '',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        lowStockStore.setData(data)
                        modalStore.open(lowStockStore.modalId, {
                            type: 'EDIT',
                            title: 'Editar stock producto'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton])
                }
            }
        ]

        return columns
    }

    return { getLowStock, getTableColumns }
}
