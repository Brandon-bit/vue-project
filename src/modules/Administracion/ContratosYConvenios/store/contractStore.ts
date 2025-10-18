import { defineStore } from 'pinia'
import type { ContractType } from '@/modules/Administracion/ContratosYConvenios/types/contractTypes'

const initialContract: ContractType = {
    id: undefined,
    name: '',
    counterpart: '',
    type: '',
    startDate: new Date(),
    expirationDate: new Date(),
    amount: 0,
    status: 'vigente',
    daysToExpiration: 0,
    description: ''
}

const useContractStore = defineStore('contract-store', {
    state: () => ({
        selectedContract: initialContract as ContractType,
        modalId: 'contract-modal'
    }),
    actions: {
        setData(data: ContractType = initialContract) {
            this.selectedContract = data
        }
    }
})

export default useContractStore
