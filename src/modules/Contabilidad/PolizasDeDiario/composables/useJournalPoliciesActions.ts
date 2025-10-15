import type { JournalPolicyType, JournalPolicyFormType } from '@/modules/Contabilidad/PolizasDeDiario/types/journalPoliciesTypes'
import useJournalPoliciesStore from '@/modules/Contabilidad/PolizasDeDiario/store/journalPoliciesStore'

// Mock data
const mockJournalPolicies: JournalPolicyType[] = [
    {
        id: 1,
        folio: 'D-001',
        date: '2024-03-15',
        concept: 'Ajuste de depreciación mensual de activos fijos',
        total: 15000,
        user: 'Admin',
        entries: [
            {
                id: '1-1',
                account: '5201-001 Depreciación',
                description: 'Depreciación mensual equipo de cómputo',
                debit: 15000,
                credit: 0,
                reference: 'DEP-MAR-2024'
            },
            {
                id: '1-2',
                account: '1201-002 Depreciación Acumulada',
                description: 'Contrapartida depreciación',
                debit: 0,
                credit: 15000,
                reference: 'DEP-MAR-2024'
            }
        ]
    },
    {
        id: 2,
        folio: 'D-002',
        date: '2024-03-16',
        concept: 'Reclasificación de gastos administrativos',
        total: 8500,
        user: 'Contador',
        entries: [
            {
                id: '2-1',
                account: '5103-001 Gastos administrativos',
                description: 'Reclasificación de gastos',
                debit: 8500,
                credit: 0,
                reference: 'RECLAS-001'
            },
            {
                id: '2-2',
                account: '5102-002 Gastos de operación',
                description: 'Contrapartida reclasificación',
                debit: 0,
                credit: 8500,
                reference: 'RECLAS-001'
            }
        ]
    },
    {
        id: 3,
        folio: 'D-003',
        date: '2024-03-18',
        concept: 'Ajuste por diferencia cambiaria',
        total: 2500,
        user: 'Admin',
        entries: [
            {
                id: '3-1',
                account: '5301-001 Gastos financieros',
                description: 'Pérdida cambiaria USD',
                debit: 2500,
                credit: 0,
                reference: 'TC-MAR-18'
            },
            {
                id: '3-2',
                account: '1105-002 Bancos USD',
                description: 'Ajuste tipo de cambio',
                debit: 0,
                credit: 2500,
                reference: 'TC-MAR-18'
            }
        ]
    },
    {
        id: 4,
        folio: 'D-004',
        date: '2024-03-20',
        concept: 'Provisión de impuestos por pagar',
        total: 12000,
        user: 'Contador',
        entries: [
            {
                id: '4-1',
                account: '5401-001 Impuestos',
                description: 'Provisión ISR mensual',
                debit: 12000,
                credit: 0,
                reference: 'ISR-MAR'
            },
            {
                id: '4-2',
                account: '2103-001 Impuestos por pagar',
                description: 'Provisión ISR',
                debit: 0,
                credit: 12000,
                reference: 'ISR-MAR'
            }
        ]
    },
    {
        id: 5,
        folio: 'D-005',
        date: '2024-03-22',
        concept: 'Ajuste de inventario por merma',
        total: 3200,
        user: 'Admin',
        entries: [
            {
                id: '5-1',
                account: '5105-001 Mermas',
                description: 'Merma de inventario detectada',
                debit: 3200,
                credit: 0,
                reference: 'INV-MERMA-001'
            },
            {
                id: '5-2',
                account: '1104-001 Inventarios',
                description: 'Baja de inventario',
                debit: 0,
                credit: 3200,
                reference: 'INV-MERMA-001'
            }
        ]
    },
    {
        id: 6,
        folio: 'D-006',
        date: '2024-03-25',
        concept: 'Provisión de cuentas incobrables',
        total: 5000,
        user: 'Contador',
        entries: [
            {
                id: '6-1',
                account: '5106-001 Cuentas incobrables',
                description: 'Provisión estimada',
                debit: 5000,
                credit: 0,
                reference: 'PROV-CXC-001'
            },
            {
                id: '6-2',
                account: '1103-002 Estimación cuentas incobrables',
                description: 'Contrapartida provisión',
                debit: 0,
                credit: 5000,
                reference: 'PROV-CXC-001'
            }
        ]
    }
]

export const useJournalPoliciesActions = () => {
    const journalPoliciesStore = useJournalPoliciesStore()

    const getJournalPolicies = async (page: number, pageSize: number): Promise<{ items: JournalPolicyType[], total: number }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedData = mockJournalPolicies.slice(start, end)
        
        return {
            items: paginatedData,
            total: mockJournalPolicies.length
        }
    }

    const getJournalPolicyById = async (id: number): Promise<JournalPolicyType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockJournalPolicies.find(policy => policy.id === id) || null
    }

    const createJournalPolicy = async (data: JournalPolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating journal policy:', data)
        
        return {
            message: 'Póliza de diario creada correctamente',
            status: 'success'
        }
    }

    const updateJournalPolicy = async (id: number, data: JournalPolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Updating journal policy:', id, data)
        
        return {
            message: 'Póliza de diario actualizada correctamente',
            status: 'success'
        }
    }

    const deleteJournalPolicy = async (): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const id = journalPoliciesStore.selectedPolicy?.id
        console.log('Deleting journal policy:', id)
        
        return {
            message: 'Póliza de diario eliminada correctamente',
            status: 'success'
        }
    }

    return {
        getJournalPolicies,
        getJournalPolicyById,
        createJournalPolicy,
        updateJournalPolicy,
        deleteJournalPolicy
    }
}
