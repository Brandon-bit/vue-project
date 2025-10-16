import type { IncomePolicyType, IncomePolicyFormType, InvoiceType } from '@/modules/Contabilidad/PolizasDeIngresos/types/incomePoliciesTypes'

// Mock data
const mockIncomePolicies: IncomePolicyType[] = [
    {
        id: 1,
        folio: 'I-001',
        date: '2024-03-15',
        client: 'Empresa ABC S.A.',
        concept: 'Pago de factura A-123',
        total: 50000,
        paymentMethod: 'Transferencia',
        bankAccount: 'BBVA - 0123456789',
        bankReference: 'REF-001-2024',
        entries: [
            {
                id: '1-1',
                account: '102-001 Bancos BBVA',
                description: 'Cargo a banco por cobro',
                debit: 50000,
                credit: 0,
                reference: 'A-123'
            },
            {
                id: '1-2',
                account: '105-001 Clientes',
                description: 'Abono a cuenta de cliente',
                debit: 0,
                credit: 43000,
                reference: 'A-123'
            },
            {
                id: '1-3',
                account: '208-001 IVA Trasladado',
                description: 'IVA trasladado cobrado',
                debit: 0,
                credit: 7000,
                reference: 'A-123'
            }
        ]
    },
    {
        id: 2,
        folio: 'I-002',
        date: '2024-03-16',
        client: 'Cliente XYZ',
        concept: 'Cobro de servicios profesionales',
        total: 28500,
        paymentMethod: 'Cheque',
        bankAccount: 'Santander - 9876543210',
        bankReference: 'CHQ-456',
        entries: [
            {
                id: '2-1',
                account: '102-002 Bancos Santander',
                description: 'Depósito de cheque',
                debit: 28500,
                credit: 0,
                reference: 'CHQ-456'
            },
            {
                id: '2-2',
                account: '401-001 Ingresos por servicios',
                description: 'Ingreso por servicios',
                debit: 0,
                credit: 24510,
                reference: 'CHQ-456'
            },
            {
                id: '2-3',
                account: '208-001 IVA Trasladado',
                description: 'IVA cobrado',
                debit: 0,
                credit: 3990,
                reference: 'CHQ-456'
            }
        ]
    },
    {
        id: 3,
        folio: 'I-003',
        date: '2024-03-18',
        client: 'Corporativo DEF',
        concept: 'Cobro de venta de mercancía',
        total: 75000,
        paymentMethod: 'Transferencia',
        bankAccount: 'BBVA - 0123456789',
        bankReference: 'TRANS-789',
        entries: [
            {
                id: '3-1',
                account: '102-001 Bancos BBVA',
                description: 'Transferencia recibida',
                debit: 75000,
                credit: 0,
                reference: 'TRANS-789'
            },
            {
                id: '3-2',
                account: '105-001 Clientes',
                description: 'Abono a cliente',
                debit: 0,
                credit: 64500,
                reference: 'TRANS-789'
            },
            {
                id: '3-3',
                account: '208-001 IVA Trasladado',
                description: 'IVA cobrado',
                debit: 0,
                credit: 10500,
                reference: 'TRANS-789'
            }
        ]
    },
    {
        id: 4,
        folio: 'I-004',
        date: '2024-03-20',
        client: 'Empresa ABC S.A.',
        concept: 'Anticipo de proyecto',
        total: 100000,
        paymentMethod: 'Transferencia',
        bankAccount: 'Banorte - 5555666677',
        bankReference: 'ANT-2024-001',
        entries: [
            {
                id: '4-1',
                account: '102-003 Bancos Banorte',
                description: 'Anticipo recibido',
                debit: 100000,
                credit: 0,
                reference: 'ANT-2024-001'
            },
            {
                id: '4-2',
                account: '206-001 Anticipos de clientes',
                description: 'Anticipo pendiente de aplicar',
                debit: 0,
                credit: 100000,
                reference: 'ANT-2024-001'
            }
        ]
    }
]

const mockInvoices: InvoiceType[] = [
    { id: 'F-001', folio: 'A-123', amount: 50000, date: '2024-02-15' },
    { id: 'F-002', folio: 'A-124', amount: 32000, date: '2024-02-20' },
    { id: 'F-003', folio: 'A-125', amount: 18500, date: '2024-03-01' },
    { id: 'F-004', folio: 'A-126', amount: 45000, date: '2024-03-05' }
]

export const useIncomePoliciesActions = () => {
    const getIncomePolicies = async (page: number, pageSize: number): Promise<{ items: IncomePolicyType[], total: number }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedData = mockIncomePolicies.slice(start, end)
        
        return {
            items: paginatedData,
            total: mockIncomePolicies.length
        }
    }

    const getIncomePolicyById = async (id: number): Promise<IncomePolicyType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockIncomePolicies.find(policy => policy.id === id) || null
    }

    const getAvailableInvoices = async (): Promise<InvoiceType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return mockInvoices
    }

    const createIncomePolicy = async (data: IncomePolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating income policy:', data)
        
        return {
            message: 'Póliza de ingreso creada correctamente',
            status: 'success'
        }
    }

    const updateIncomePolicy = async (id: number, data: IncomePolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Updating income policy:', id, data)
        
        return {
            message: 'Póliza de ingreso actualizada correctamente',
            status: 'success'
        }
    }

    const deleteIncomePolicy = async (id: number): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Deleting income policy:', id)
        
        return {
            message: 'Póliza de ingreso eliminada correctamente',
            status: 'success'
        }
    }

    return {
        getIncomePolicies,
        getIncomePolicyById,
        getAvailableInvoices,
        createIncomePolicy,
        updateIncomePolicy,
        deleteIncomePolicy
    }
}
