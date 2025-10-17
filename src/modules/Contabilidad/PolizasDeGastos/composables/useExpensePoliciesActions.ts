import type { ExpensePolicyType, ExpensePolicyFormType, SupplierInvoiceType } from '@/modules/Contabilidad/PolizasDeGastos/types/expensePoliciesTypes'

// Mock data
const mockExpensePolicies: ExpensePolicyType[] = [
    {
        id: 1,
        folio: 'G-001',
        date: '2024-03-15',
        supplier: 'Proveedor Industrial S.A.',
        concept: 'Compra de materiales de producción',
        total: 35000,
        expenseType: 'operacion',
        costCenter: 'produccion',
        paymentMethod: 'transferencia',
        bankAccount: 'banco1',
        paymentReference: 'TRANS-2024-001',
        entries: [
            {
                id: '1-1',
                account: '601-001 Gastos de Operación',
                description: 'Compra de materiales',
                debit: 30100,
                credit: 0,
                reference: 'FAC-456'
            },
            {
                id: '1-2',
                account: '119-001 IVA Acreditable',
                description: 'IVA acreditable',
                debit: 4900,
                credit: 0,
                reference: 'FAC-456'
            },
            {
                id: '1-3',
                account: '102-001 Bancos BBVA',
                description: 'Pago a proveedor',
                debit: 0,
                credit: 35000,
                reference: 'FAC-456'
            }
        ]
    },
    {
        id: 2,
        folio: 'G-002',
        date: '2024-03-16',
        supplier: 'Servicios Corporativos',
        concept: 'Pago de servicios de limpieza',
        total: 12500,
        expenseType: 'administrativo',
        costCenter: 'administracion',
        paymentMethod: 'cheque',
        bankAccount: 'banco2',
        paymentReference: 'CHQ-789',
        entries: [
            {
                id: '2-1',
                account: '602-001 Gastos Administrativos',
                description: 'Servicios de limpieza',
                debit: 10750,
                credit: 0,
                reference: 'FAC-457'
            },
            {
                id: '2-2',
                account: '119-001 IVA Acreditable',
                description: 'IVA acreditable',
                debit: 1750,
                credit: 0,
                reference: 'FAC-457'
            },
            {
                id: '2-3',
                account: '102-002 Bancos Santander',
                description: 'Pago con cheque',
                debit: 0,
                credit: 12500,
                reference: 'FAC-457'
            }
        ]
    },
    {
        id: 3,
        folio: 'G-003',
        date: '2024-03-18',
        supplier: 'Distribuidora Nacional',
        concept: 'Compra de insumos de oficina',
        total: 8500,
        expenseType: 'administrativo',
        costCenter: 'administracion',
        paymentMethod: 'efectivo',
        bankAccount: 'caja',
        paymentReference: 'CAJA-001',
        entries: [
            {
                id: '3-1',
                account: '602-002 Material de oficina',
                description: 'Insumos de oficina',
                debit: 7310,
                credit: 0,
                reference: 'FAC-458'
            },
            {
                id: '3-2',
                account: '119-001 IVA Acreditable',
                description: 'IVA acreditable',
                debit: 1190,
                credit: 0,
                reference: 'FAC-458'
            },
            {
                id: '3-3',
                account: '101-001 Caja Chica',
                description: 'Pago en efectivo',
                debit: 0,
                credit: 8500,
                reference: 'FAC-458'
            }
        ]
    },
    {
        id: 4,
        folio: 'G-004',
        date: '2024-03-20',
        supplier: 'Agencia de Marketing Digital',
        concept: 'Campaña publicitaria en redes sociales',
        total: 45000,
        expenseType: 'venta',
        costCenter: 'marketing',
        paymentMethod: 'transferencia',
        bankAccount: 'banco1',
        paymentReference: 'TRANS-2024-002',
        entries: [
            {
                id: '4-1',
                account: '603-001 Gastos de Venta',
                description: 'Publicidad digital',
                debit: 38700,
                credit: 0,
                reference: 'FAC-459'
            },
            {
                id: '4-2',
                account: '119-001 IVA Acreditable',
                description: 'IVA acreditable',
                debit: 6300,
                credit: 0,
                reference: 'FAC-459'
            },
            {
                id: '4-3',
                account: '102-001 Bancos BBVA',
                description: 'Pago a agencia',
                debit: 0,
                credit: 45000,
                reference: 'FAC-459'
            }
        ]
    }
]

const mockSupplierInvoices: SupplierInvoiceType[] = [
    { id: 'F-001', folio: 'FAC-456', amount: 35000, date: '2024-02-20', concept: 'Materiales' },
    { id: 'F-002', folio: 'FAC-457', amount: 18000, date: '2024-02-25', concept: 'Servicios' },
    { id: 'F-003', folio: 'FAC-458', amount: 22500, date: '2024-03-05', concept: 'Insumos' },
    { id: 'F-004', folio: 'FAC-459', amount: 45000, date: '2024-03-10', concept: 'Publicidad' }
]

export const useExpensePoliciesActions = () => {
    const getExpensePolicies = async (page: number, pageSize: number): Promise<{ items: ExpensePolicyType[], total: number }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedData = mockExpensePolicies.slice(start, end)
        
        return {
            items: paginatedData,
            total: mockExpensePolicies.length
        }
    }

    const getExpensePolicyById = async (id: number): Promise<ExpensePolicyType | null> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return mockExpensePolicies.find(policy => policy.id === id) || null
    }

    const getSupplierInvoices = async (): Promise<SupplierInvoiceType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return mockSupplierInvoices
    }

    const createExpensePolicy = async (data: ExpensePolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Creating expense policy:', data)
        
        return {
            message: 'Póliza de gasto creada correctamente',
            status: 'success'
        }
    }

    const updateExpensePolicy = async (id: number, data: ExpensePolicyFormType): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Updating expense policy:', id, data)
        
        return {
            message: 'Póliza de gasto actualizada correctamente',
            status: 'success'
        }
    }

    const deleteExpensePolicy = async (id: number): Promise<{ message: string; status: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Deleting expense policy:', id)
        
        return {
            message: 'Póliza de gasto eliminada correctamente',
            status: 'success'
        }
    }

    return {
        getExpensePolicies,
        getExpensePolicyById,
        getSupplierInvoices,
        createExpensePolicy,
        updateExpensePolicy,
        deleteExpensePolicy
    }
}
