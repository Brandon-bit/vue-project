import { h } from 'vue'
import type { DocumentType } from '@/modules/Administracion/GestionDocumental/types/documentTypes'

type ColumnType<T> = {
    key: string
    label: string
    render?: (row: T) => any
}
import { useModalStore } from '@/shared/stores/modal.store'
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'
import { useDocumentActions } from '@/modules/Administracion/GestionDocumental/composables/useDocumentActions'
import { showNotification } from '@/utils/toastNotifications'

export const useDocument = () => {
    const modalStore = useModalStore()
    const documentStore = useDocumentStore()
    const { downloadDocument } = useDocumentActions()

    const openViewModal = (document: DocumentType) => {
        documentStore.setData(document)
        modalStore.open(documentStore.modalId, { type: 'VIEW', title: document.name })
    }

    const openEditModal = (document: DocumentType) => {
        documentStore.setData(document)
        modalStore.open(documentStore.modalId, { type: 'EDIT', title: 'Editar Documento' })
    }

    const openDeleteModal = (document: DocumentType) => {
        documentStore.setData(document)
        modalStore.open(documentStore.modalId, { type: 'DELETE', title: 'Eliminar Documento' })
    }

    const handleDownload = async (document: DocumentType) => {
        try {
            if (document.id) {
                await downloadDocument(document.id, document.name)
                showNotification('Documento descargado correctamente', 'success')
            }
        } catch (error) {
            showNotification('Error al descargar el documento', 'error')
        }
    }

    const columns: ColumnType<DocumentType>[] = [
        {
            key: 'name',
            label: 'Documento',
            render: (row: DocumentType) => {
                return h('div', { class: 'flex items-center gap-2' }, [
                    h('span', { class: 'material-symbols-outlined text-base-content/70' }, 'description'),
                    h('div', {}, [
                        h('p', { class: 'font-medium' }, row.name),
                        h('p', { class: 'text-xs text-base-content/70' }, row.version),
                        row.confidential ? h('span', { 
                            class: 'material-symbols-outlined text-error text-xs ml-1' 
                        }, 'lock') : null
                    ])
                ])
            }
        },
        {
            key: 'category',
            label: 'Categoría',
            render: (row: DocumentType) => {
                return h('span', { class: 'badge badge-outline' }, row.category)
            }
        },
        {
            key: 'size',
            label: 'Tamaño',
            render: (row: DocumentType) => {
                return h('span', { class: 'text-sm' }, row.size)
            }
        },
        {
            key: 'uploadDate',
            label: 'Fecha',
            render: (row: DocumentType) => {
                return h('span', { class: 'text-sm' }, new Date(row.uploadDate).toLocaleDateString())
            }
        },
        {
            key: 'uploadedBy',
            label: 'Subido Por',
            render: (row: DocumentType) => {
                return h('span', { class: 'text-sm' }, row.uploadedBy)
            }
        },
        {
            key: 'tags',
            label: 'Tags',
            render: (row: DocumentType) => {
                return h('div', { class: 'flex gap-1 flex-wrap' }, 
                    row.tags.map(tag => 
                        h('span', { class: 'badge badge-secondary badge-sm' }, tag)
                    )
                )
            }
        },
        {
            key: 'actions',
            label: 'Acciones',
            render: (row: DocumentType) => {
                return h('div', { class: 'flex gap-1' }, [
                    h('button', {
                        class: 'btn btn-ghost btn-sm btn-square',
                        onClick: () => openViewModal(row)
                    }, h('span', { class: 'material-symbols-outlined text-lg' }, 'visibility')),
                    h('button', {
                        class: 'btn btn-ghost btn-sm btn-square',
                        onClick: () => handleDownload(row)
                    }, h('span', { class: 'material-symbols-outlined text-lg' }, 'download')),
                    h('button', {
                        class: 'btn btn-ghost btn-sm btn-square',
                        onClick: () => openDeleteModal(row)
                    }, h('span', { class: 'material-symbols-outlined text-lg' }, 'delete'))
                ])
            }
        }
    ]

    return { columns }
}
