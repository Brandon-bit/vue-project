import {
    PayrollPeriodDTO,
    PayrollPeriodFormDTO,
    SelectOptionDTO
} from '@/modules/Nomina/PeriodosNomina/types/payrollPeriodTypes'
import usePayrollPeriodStore from '@/modules/Nomina/PeriodosNomina/store/payrollPeriodStore'
import {
    mapPayrollPeriodToSelectOption
} from '@/modules/Nomina/PeriodosNomina/composables/mappingPayrollPeriods'

export const usePayrollPeriodActions = () => {
    const payrollPeriodStore = usePayrollPeriodStore()

    // Mock data for payroll periods
    const mockPayrollPeriods: PayrollPeriodDTO[] = [
        {
            id: 1,
            name: 'Nómina Quincenal Enero 2025 - 1ra Quincena',
            type: 'quincenal',
            startDate: '2025-01-01',
            endDate: '2025-01-15',
            status: 'cerrada',
            payrollType: 'ordinaria',
            notes: 'Primera quincena del año',
            totalPerceptions: 150000,
            totalDeductions: 35000,
            totalNet: 115000,
            active: true
        },
        {
            id: 2,
            name: 'Nómina Quincenal Enero 2025 - 2da Quincena',
            type: 'quincenal',
            startDate: '2025-01-16',
            endDate: '2025-01-31',
            status: 'pagada',
            payrollType: 'ordinaria',
            notes: 'Segunda quincena del año',
            totalPerceptions: 148000,
            totalDeductions: 34500,
            totalNet: 113500,
            active: true
        },
        {
            id: 3,
            name: 'Nómina Quincenal Febrero 2025 - 1ra Quincena',
            type: 'quincenal',
            startDate: '2025-02-01',
            endDate: '2025-02-15',
            status: 'calculada',
            payrollType: 'ordinaria',
            notes: '',
            totalPerceptions: 152000,
            totalDeductions: 36000,
            totalNet: 116000,
            active: true
        },
        {
            id: 4,
            name: 'Aguinaldo 2024',
            type: 'mensual',
            startDate: '2024-12-01',
            endDate: '2024-12-31',
            status: 'cerrada',
            payrollType: 'extraordinaria',
            notes: 'Pago de aguinaldo anual',
            totalPerceptions: 200000,
            totalDeductions: 45000,
            totalNet: 155000,
            active: true
        },
        {
            id: 5,
            name: 'Nómina Quincenal Febrero 2025 - 2da Quincena',
            type: 'quincenal',
            startDate: '2025-02-16',
            endDate: '2025-02-28',
            status: 'borrador',
            payrollType: 'ordinaria',
            notes: '',
            totalPerceptions: 0,
            totalDeductions: 0,
            totalNet: 0,
            active: true
        }
    ]

    const getPayrollPeriods = async (
        page: number,
        pageSize: number
    ): Promise<{ items: PayrollPeriodDTO[]; total: number }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedData = mockPayrollPeriods.slice(startIndex, endIndex)

        return {
            items: paginatedData,
            total: mockPayrollPeriods.length
        }
    }

    const getPayrollPeriodsForSelect = async (): Promise<SelectOptionDTO[]> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        const filtered = mockPayrollPeriods.filter((period) => period.active)

        return filtered.map(mapPayrollPeriodToSelectOption)
    }

    const createPayrollPeriod = async (
        data: PayrollPeriodFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newPeriod: PayrollPeriodDTO = {
            id: mockPayrollPeriods.length + 1,
            ...data,
            totalPerceptions: 0,
            totalDeductions: 0,
            totalNet: 0
        }

        mockPayrollPeriods.push(newPeriod)

        return {
            message: 'Período de nómina creado exitosamente',
            status: 'success',
            data: newPeriod
        }
    }

    const updatePayrollPeriod = async (
        data: PayrollPeriodFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockPayrollPeriods.findIndex((period) => period.id === data.id)

        if (index !== -1) {
            mockPayrollPeriods[index] = {
                ...mockPayrollPeriods[index],
                ...data
            }

            return {
                message: 'Período de nómina actualizado exitosamente',
                status: 'success',
                data: mockPayrollPeriods[index]
            }
        }

        return {
            message: 'Período no encontrado',
            status: 'error',
            data: null
        }
    }

    const deletePayrollPeriod = async (): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = payrollPeriodStore.selectedPayrollPeriod?.id

        if (!id) {
            return {
                message: 'ID de período no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockPayrollPeriods.findIndex((period) => period.id === id)

        if (index !== -1) {
            const deleted = mockPayrollPeriods.splice(index, 1)
            return {
                message: 'Período eliminado exitosamente',
                status: 'success',
                data: deleted[0]
            }
        }

        return {
            message: 'Período no encontrado',
            status: 'error',
            data: null
        }
    }

    return {
        getPayrollPeriods,
        getPayrollPeriodsForSelect,
        createPayrollPeriod,
        updatePayrollPeriod,
        deletePayrollPeriod
    }
}
