import type { AccountingPolicyType, AccountingPolicyFormType } from '@/modules/Contabilidad/PolizasContables/types/accountingPoliciesTypes'

// Mock data
const mockAccountingPolicies: AccountingPolicyType[] = [
    {
        id: 1,
        folio: 'D-001',
        date: '2025-01-15',
        type: 'Diario',
        concept: 'Compra de mobiliario y equipo',
        total: 50000,
        status: 'Cuadrada',
        entries: [
            {
                id: '1-1',
                account: '1202 - Mobiliario y Equipo',
                description: 'Compra de escritorios',
                debit: 50000,
                credit: 0,
                reference: 'FAC-001'
            },
            {
                id: '1-2',
                account: '1102 - Bancos',
                description: 'Pago con transferencia',
                debit: 0,
                credit: 50000,
                reference: 'TRANSF-001'
            }
        ]
    },
    {
        id: 2,
        folio: 'I-001',
        date: '2025-01-14',
        type: 'Ingreso',
        concept: 'Venta de servicios profesionales',
        total: 100000,
        status: 'Cuadrada',
        entries: [
            {
                id: '2-1',
                account: '1102 - Bancos',
                description: 'Cobro de servicios',
                debit: 100000,
                credit: 0,
                reference: 'DEP-001'
            },
            {
                id: '2-2',
                account: '4000 - Ingresos',
                description: 'Ingresos por servicios',
                debit: 0,
                credit: 100000,
                reference: 'FAC-002'
            }
        ]
    },
    {
        id: 3,
        folio: 'E-001',
        date: '2025-01-13',
        type: 'Egreso',
        concept: 'Pago de renta de oficinas',
        total: 25000,
        status: 'Cuadrada',
        entries: [
            {
                id: '3-1',
                account: '5000 - Gastos',
                description: 'Renta de oficinas',
                debit: 25000,
                credit: 0,
                reference: 'REC-001'
            },
            {
                id: '3-2',
                account: '1102 - Bancos',
                description: 'Pago de renta',
                debit: 0,
                credit: 25000,
                reference: 'TRANSF-002'
            }
        ]
    },
    {
        id: 4,
        folio: 'D-002',
        date: '2025-01-12',
        type: 'Diario',
        concept: 'Ajuste contable por depreciación',
        total: 5000,
        status: 'Cuadrada',
        entries: [
            {
                id: '4-1',
                account: '5201 - Depreciación',
                description: 'Depreciación mensual',
                debit: 5000,
                credit: 0,
                reference: 'DEP-001'
            },
            {
                id: '4-2',
                account: '1202-001 - Depreciación Acumulada',
                description: 'Acumulación de depreciación',
                debit: 0,
                credit: 5000,
                reference: 'DEP-001'
            }
        ]
    }
]

export const useAccountingPoliciesActions = () => {
    const getAccountingPolicies = async (page: number, pageSize: number): Promise<{ items: AccountingPolicyType[], total: number }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedData = mockAccountingPolicies.slice(start, end)
        
        return {
            items: paginatedData,
            total: mockAccountingPolicies.length
        }
    }

    const getAccountingPolicyById = async (id: number): Promise<AccountingPolicyType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockAccountingPolicies.find(policy => policy.id === id) || null
    }

    const createAccountingPolicy = async (data: AccountingPolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating accounting policy:', data)
        
        return {
            message: 'Póliza contable creada correctamente',
            status: 'success'
        }
    }

    const updateAccountingPolicy = async (id: number, data: AccountingPolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Updating accounting policy:', id, data)
        
        return {
            message: 'Póliza contable actualizada correctamente',
            status: 'success'
        }
    }

    const deleteAccountingPolicy = async (id: number): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Deleting accounting policy:', id)
        
        return {
            message: 'Póliza contable eliminada correctamente',
            status: 'success'
        }
    }

    /**
     * Descarga el documento PDF de la póliza
     */
    const downloadPolicyDocument = async (id: number): Promise<void> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Downloading policy document for ID:', id)
        
        // En producción, aquí se haría la llamada al backend para generar y descargar el PDF
        // Ejemplo:
        // const response = await axiosApiInstance.get(`/api/polizas/${id}/documento`, {
        //     responseType: 'blob'
        // })
        // const url = window.URL.createObjectURL(new Blob([response.data]))
        // const link = document.createElement('a')
        // link.href = url
        // link.setAttribute('download', `poliza-${id}.pdf`)
        // document.body.appendChild(link)
        // link.click()
        // link.remove()
        // window.URL.revokeObjectURL(url)
    }

    return {
        getAccountingPolicies,
        getAccountingPolicyById,
        createAccountingPolicy,
        updateAccountingPolicy,
        deleteAccountingPolicy,
        downloadPolicyDocument
    }
}
