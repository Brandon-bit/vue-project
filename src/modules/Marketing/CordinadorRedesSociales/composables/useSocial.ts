// src/modules/SocialPosts/composables/useSocialPosts.ts

import useSocialStore from '../store/useSocialPostStore'
import { useModalStore } from '@/shared/stores/modal.store'
import type { ColumnTableType } from '@/shared/types/columnTableType'
import { h } from 'vue'
import { editTableButton, deleteTableButton } from '@/utils/tableButtons'

const useSocialPosts = () => {
    
    const socialStore = useSocialStore()
    const modalStore = useModalStore()

    const getTableColumns = (): ColumnTableType[] => {
        return [
            {
                header: 'Publicación',
                accessorKey: 'image',
                cell: ({ row }: any) => {
                    const post = row.original
                    const imageVNode = h('div', { class: 'avatar' }, [
                        h('div', { class: 'mask mask-squircle h-12 w-12' }, [
                            h('img', { src: post.image, alt: 'Post image' })
                        ])
                    ])
                    const textVNode = h('div', {}, [
                        h('div', { class: 'font-bold' }, `Publicado el: ${new Date(post.date).toLocaleDateString()}`),
                        h('div', { class: 'text-sm opacity-50' }, post.caption?.substring(0, 30) + '...')
                    ])
                    return h('div', { class: 'flex items-center gap-3' }, [imageVNode, textVNode])
                }
            },
            {
                header: 'Estado',
                accessorKey: 'status',
                cell: ({ row }: any) => {
                    const status = row.original.status
                    const classMap = {
                        draft: 'badge-warning',
                        published: 'badge-success',
                        archived: 'badge-ghost'
                    }
                    return h('span', { class: `badge badge-sm ${classMap[status] || ''}` }, status)
                }
            },
            {
                header: 'Acciones',
                accessorKey: 'actions',
                cell: ({ row }: any) => {
                    const data = row.original
                    const editModal = () => {
                        socialStore.setData(data) 
                        modalStore.open(socialStore.modalId, { 
                            type: 'EDIT', 
                            title: 'Editar Publicación' 
                        })
                    }
                    const deleteModal = () => {
                        socialStore.setData(data)
                        modalStore.open(socialStore.modalId, {
                            type: 'DELETE',
                            title: 'Eliminar Publicación'
                        })
                    }
                    const editButton = editTableButton(editModal)
                    const deleteButton = deleteTableButton(deleteModal)
                    return h('div', { class: 'flex gap-4 justify-center' }, [editButton, deleteButton])
                }
            }
        ]
    }

    return { getTableColumns }
}

export default useSocialPosts