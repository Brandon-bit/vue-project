import useAccountsCatalogStore from '@/modules/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'
import { useModalStore } from '@/shared/stores/modal.store'
import { h } from 'vue'

const useAccountCatalog = () => {
    const accountsCatalogStore = useAccountsCatalogStore()
    const modalStore = useModalStore()

    const openEditModal = (account: any) => {
        accountsCatalogStore.setData(account)
        modalStore.open(accountsCatalogStore.modalId, {
            type: 'EDIT',
            title: 'Editar cuenta'
        })
    }

    const openDeleteModal = (account: any) => {
        accountsCatalogStore.setData(account)
        modalStore.open(accountsCatalogStore.modalId, {
            type: 'DELETE',
            title: 'Eliminar cuenta'
        })
    }

    const getTypeVariant = (type: string) => {
        const variants: Record<string, string> = {
            'Grupo': 'badge-primary',
            'Subgrupo': 'badge-secondary',
            'Cuenta': 'badge-accent',
            'Subcuenta': 'badge-neutral'
        }
        return variants[type] || 'badge-ghost'
    }

    const getNatureVariant = (nature: string) => {
        return nature === 'Deudora' ? 'badge-info' : 'badge-warning'
    }

    return {
        openEditModal,
        openDeleteModal,
        getTypeVariant,
        getNatureVariant
    }
}

export default useAccountCatalog
