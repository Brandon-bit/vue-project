import type { JournalEntryType, JournalBookFiltersType, JournalBookSummaryType } from '@/modules/Contabilidad/LibrosDeDiario/types/journalBooksTypes'

// Mock data
const mockJournalEntries: JournalEntryType[] = [
    {
        date: '2024-03-15',
        folio: 'D-001',
        type: 'Diario',
        concept: 'Ajuste de depreciación mensual',
        account: '5201-001 Depreciación',
        debit: 15000,
        credit: 0
    },
    {
        date: '2024-03-15',
        folio: 'D-001',
        type: 'Diario',
        concept: 'Ajuste de depreciación mensual',
        account: '1201-002 Depreciación Acumulada',
        debit: 0,
        credit: 15000
    },
    {
        date: '2024-03-16',
        folio: 'I-045',
        type: 'Ingreso',
        concept: 'Cobro de factura ABC-123',
        account: '1105-001 Bancos BBVA',
        debit: 50000,
        credit: 0
    },
    {
        date: '2024-03-16',
        folio: 'I-045',
        type: 'Ingreso',
        concept: 'Cobro de factura ABC-123',
        account: '1103-001 Clientes',
        debit: 0,
        credit: 50000
    },
    {
        date: '2024-03-17',
        folio: 'E-089',
        type: 'Egreso',
        concept: 'Pago de nómina quincenal',
        account: '5102-001 Sueldos y salarios',
        debit: 85000,
        credit: 0
    },
    {
        date: '2024-03-17',
        folio: 'E-089',
        type: 'Egreso',
        concept: 'Pago de nómina quincenal',
        account: '1105-001 Bancos BBVA',
        debit: 0,
        credit: 85000
    },
    {
        date: '2024-03-18',
        folio: 'I-046',
        type: 'Ingreso',
        concept: 'Venta de mercancía',
        account: '1101-001 Caja',
        debit: 25000,
        credit: 0
    },
    {
        date: '2024-03-18',
        folio: 'I-046',
        type: 'Ingreso',
        concept: 'Venta de mercancía',
        account: '4101-001 Ventas',
        debit: 0,
        credit: 25000
    },
    {
        date: '2024-03-19',
        folio: 'E-090',
        type: 'Egreso',
        concept: 'Pago de servicios públicos',
        account: '5103-001 Servicios',
        debit: 8500,
        credit: 0
    },
    {
        date: '2024-03-19',
        folio: 'E-090',
        type: 'Egreso',
        concept: 'Pago de servicios públicos',
        account: '1105-001 Bancos BBVA',
        debit: 0,
        credit: 8500
    },
    {
        date: '2024-03-20',
        folio: 'D-002',
        type: 'Diario',
        concept: 'Ajuste por diferencia cambiaria',
        account: '5301-001 Gastos financieros',
        debit: 2500,
        credit: 0
    },
    {
        date: '2024-03-20',
        folio: 'D-002',
        type: 'Diario',
        concept: 'Ajuste por diferencia cambiaria',
        account: '1105-002 Bancos USD',
        debit: 0,
        credit: 2500
    }
]

export const useJournalBooksActions = () => {
    const generateJournalBook = async (filters: JournalBookFiltersType): Promise<JournalBookSummaryType> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Filter entries based on filters
        let filteredEntries = [...mockJournalEntries]
        
        // Filter by policy type if specified
        if (filters.policyType && filters.policyType !== 'todas') {
            filteredEntries = filteredEntries.filter(entry => 
                entry.type.toLowerCase() === filters.policyType.toLowerCase()
            )
        }
        
        const totalDebit = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0)
        const totalCredit = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0)
        
        return {
            totalDebit,
            totalCredit,
            difference: totalDebit - totalCredit,
            entries: filteredEntries
        }
    }

    const exportJournalBookPDF = async (): Promise<{ message: string; status: string }> => {
        // Simulate export delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Exporting journal book to PDF...')
        
        return {
            message: 'Libro diario exportado a PDF correctamente',
            status: 'success'
        }
    }

    const exportJournalBookExcel = async (): Promise<{ message: string; status: string }> => {
        // Simulate export delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        console.log('Exporting journal book to Excel...')
        
        return {
            message: 'Libro diario exportado a Excel correctamente',
            status: 'success'
        }
    }

    const printJournalBook = async (): Promise<{ message: string; status: string }> => {
        // Simulate print delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        console.log('Printing journal book...')
        
        return {
            message: 'Enviando libro diario a impresora',
            status: 'success'
        }
    }

    return {
        generateJournalBook,
        exportJournalBookPDF,
        exportJournalBookExcel,
        printJournalBook
    }
}
