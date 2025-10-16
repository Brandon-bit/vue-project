import type { AccountType, AccountFormType } from '@/modules/Contabilidad/CatalogoDeCuentas/types/accountsCatalogTypes'
import useAccountsCatalogStore from '@/modules/Contabilidad/CatalogoDeCuentas/store/accountsCatalogStore'

// Mock data
const mockAccounts: AccountType[] = [
    {
        id: '1',
        code: '1000',
        name: 'ACTIVO',
        type: 'Grupo',
        nature: 'Deudora',
        level: 1,
        balance: 850000,
        currency: 'MXN',
        acceptsMovements: false,
        requiresAuxiliary: false,
        active: true,
        subaccounts: [
            {
                id: '1-1',
                code: '1100',
                name: 'Activo Circulante',
                type: 'Subgrupo',
                nature: 'Deudora',
                level: 2,
                balance: 450000,
                currency: 'MXN',
                acceptsMovements: false,
                requiresAuxiliary: false,
                active: true,
                subaccounts: [
                    {
                        id: '1-1-1',
                        code: '1101',
                        name: 'Caja',
                        type: 'Cuenta',
                        nature: 'Deudora',
                        level: 3,
                        balance: 50000,
                        currency: 'MXN',
                        acceptsMovements: true,
                        requiresAuxiliary: false,
                        active: true
                    },
                    {
                        id: '1-1-2',
                        code: '1102',
                        name: 'Bancos',
                        type: 'Cuenta',
                        nature: 'Deudora',
                        level: 3,
                        balance: 400000,
                        currency: 'MXN',
                        acceptsMovements: true,
                        requiresAuxiliary: true,
                        active: true
                    }
                ]
            },
            {
                id: '1-2',
                code: '1200',
                name: 'Activo Fijo',
                type: 'Subgrupo',
                nature: 'Deudora',
                level: 2,
                balance: 400000,
                currency: 'MXN',
                acceptsMovements: false,
                requiresAuxiliary: false,
                active: true,
                subaccounts: [
                    {
                        id: '1-2-1',
                        code: '1201',
                        name: 'Equipo de Cómputo',
                        type: 'Cuenta',
                        nature: 'Deudora',
                        level: 3,
                        balance: 150000,
                        currency: 'MXN',
                        acceptsMovements: true,
                        requiresAuxiliary: true,
                        active: true
                    },
                    {
                        id: '1-2-2',
                        code: '1202',
                        name: 'Mobiliario y Equipo',
                        type: 'Cuenta',
                        nature: 'Deudora',
                        level: 3,
                        balance: 250000,
                        currency: 'MXN',
                        acceptsMovements: true,
                        requiresAuxiliary: false,
                        active: true
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        code: '2000',
        name: 'PASIVO',
        type: 'Grupo',
        nature: 'Acreedora',
        level: 1,
        balance: 350000,
        currency: 'MXN',
        acceptsMovements: false,
        requiresAuxiliary: false,
        active: true,
        subaccounts: [
            {
                id: '2-1',
                code: '2100',
                name: 'Pasivo Circulante',
                type: 'Subgrupo',
                nature: 'Acreedora',
                level: 2,
                balance: 200000,
                currency: 'MXN',
                acceptsMovements: false,
                requiresAuxiliary: false,
                active: true,
                subaccounts: [
                    {
                        id: '2-1-1',
                        code: '2101',
                        name: 'Proveedores',
                        type: 'Cuenta',
                        nature: 'Acreedora',
                        level: 3,
                        balance: 150000,
                        currency: 'MXN',
                        acceptsMovements: true,
                        requiresAuxiliary: true,
                        active: true
                    },
                    {
                        id: '2-1-2',
                        code: '2102',
                        name: 'Acreedores Diversos',
                        type: 'Cuenta',
                        nature: 'Acreedora',
                        level: 3,
                        balance: 50000,
                        currency: 'MXN',
                        acceptsMovements: true,
                        requiresAuxiliary: false,
                        active: true
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        code: '3000',
        name: 'CAPITAL',
        type: 'Grupo',
        nature: 'Acreedora',
        level: 1,
        balance: 500000,
        currency: 'MXN',
        acceptsMovements: false,
        requiresAuxiliary: false,
        active: true,
        subaccounts: [
            {
                id: '3-1',
                code: '3100',
                name: 'Capital Social',
                type: 'Cuenta',
                nature: 'Acreedora',
                level: 2,
                balance: 500000,
                currency: 'MXN',
                acceptsMovements: true,
                requiresAuxiliary: false,
                active: true
            }
        ]
    }
]

export const useAccountCatalogActions = () => {
    const accountsCatalogStore = useAccountsCatalogStore()

    const getAccountsCatalog = async (): Promise<AccountType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return mockAccounts
    }

    const getAccountById = async (id: string): Promise<AccountType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // Recursive function to find account by id
        const findAccount = (accounts: AccountType[]): AccountType | null => {
            for (const account of accounts) {
                if (account.id === id) return account
                if (account.subaccounts) {
                    const found = findAccount(account.subaccounts)
                    if (found) return found
                }
            }
            return null
        }
        
        return findAccount(mockAccounts)
    }

    const createAccount = async (data: AccountFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating account:', data)
        
        return {
            message: 'Cuenta creada correctamente',
            status: 'success'
        }
    }

    const updateAccount = async (id: string, data: AccountFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Updating account:', id, data)
        
        return {
            message: 'Cuenta actualizada correctamente',
            status: 'success'
        }
    }

    const deleteAccount = async (): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const id = accountsCatalogStore.selectedAccount?.id
        console.log('Deleting account:', id)
        
        return {
            message: 'Cuenta eliminada correctamente',
            status: 'success'
        }
    }

    return {
        getAccountsCatalog,
        getAccountById,
        createAccount,
        updateAccount,
        deleteAccount
    }
}
