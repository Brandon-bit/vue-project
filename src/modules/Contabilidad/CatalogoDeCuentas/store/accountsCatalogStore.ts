import { defineStore } from 'pinia'
import type { AccountType } from '@/modules/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'

const initialAccount: AccountType = {
    id: undefined,
    code: '',
    name: '',
    type: 'Cuenta',
    nature: 'Deudora',
    level: 3,
    balance: 0,
    currency: 'MXN',
    acceptsMovements: true,
    requiresAuxiliary: false,
    active: true
}

const useAccountsCatalogStore = defineStore('accounts-catalog-store', {
    state: () => ({
        selectedAccount: initialAccount as AccountType,
        modalId: 'accounts-catalog-modal'
    }),
    actions: {
        setData(data: AccountType = initialAccount) {
            this.selectedAccount = data
        }
    }
})

export default useAccountsCatalogStore
