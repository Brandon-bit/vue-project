import {
    PayrollDetailDTO,
    PayrollDetailFormDTO,
    EmployeePayrollSummary,
    PayrollPeriodSummary
} from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'
import usePayrollDetailStore from '@/modules/Nomina/DetalleNomina/store/payrollDetailStore'

export const usePayrollDetailActions = () => {
    const payrollDetailStore = usePayrollDetailStore()

    // Mock data - Detalles de nómina por período
    const mockPayrollDetails: PayrollDetailDTO[] = [
        // Período 1 - Empleado 1 (Juan Pérez)
        { id: 1, payrollPeriodId: 1, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 1, conceptName: 'Sueldo Base', conceptCode: 'P001', amount: 10000, type: 'percepcion' },
        { id: 2, payrollPeriodId: 1, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 2, conceptName: 'Bono de Puntualidad', conceptCode: 'P002', amount: 500, type: 'percepcion' },
        { id: 3, payrollPeriodId: 1, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 8, conceptName: 'ISR', conceptCode: 'D001', amount: 1500, type: 'deduccion' },
        { id: 4, payrollPeriodId: 1, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 9, conceptName: 'IMSS', conceptCode: 'D002', amount: 237.50, type: 'deduccion' },
        
        // Período 1 - Empleado 2 (María López)
        { id: 5, payrollPeriodId: 1, employeeId: 2, employeeName: 'María López', conceptId: 1, conceptName: 'Sueldo Base', conceptCode: 'P001', amount: 12000, type: 'percepcion' },
        { id: 6, payrollPeriodId: 1, employeeId: 2, employeeName: 'María López', conceptId: 3, conceptName: 'Comisiones', conceptCode: 'P003', amount: 2000, type: 'percepcion' },
        { id: 7, payrollPeriodId: 1, employeeId: 2, employeeName: 'María López', conceptId: 8, conceptName: 'ISR', conceptCode: 'D001', amount: 2100, type: 'deduccion' },
        { id: 8, payrollPeriodId: 1, employeeId: 2, employeeName: 'María López', conceptId: 9, conceptName: 'IMSS', conceptCode: 'D002', amount: 285, type: 'deduccion' },
        
        // Período 2 - Empleado 1 (Juan Pérez)
        { id: 9, payrollPeriodId: 2, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 1, conceptName: 'Sueldo Base', conceptCode: 'P001', amount: 10000, type: 'percepcion' },
        { id: 10, payrollPeriodId: 2, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 4, conceptName: 'Horas Extra', conceptCode: 'P004', amount: 1200, type: 'percepcion' },
        { id: 11, payrollPeriodId: 2, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 8, conceptName: 'ISR', conceptCode: 'D001', amount: 1680, type: 'deduccion' },
        { id: 12, payrollPeriodId: 2, employeeId: 1, employeeName: 'Juan Pérez', conceptId: 9, conceptName: 'IMSS', conceptCode: 'D002', amount: 266, type: 'deduccion' }
    ]

    const getPayrollPeriodSummary = async (periodId: number): Promise<PayrollPeriodSummary> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Filter details by period
        const periodDetails = mockPayrollDetails.filter(d => d.payrollPeriodId === periodId)

        // Group by employee
        const employeeMap = new Map<number, EmployeePayrollSummary>()

        periodDetails.forEach(detail => {
            if (!employeeMap.has(detail.employeeId)) {
                employeeMap.set(detail.employeeId, {
                    employeeId: detail.employeeId,
                    employeeName: detail.employeeName || '',
                    employeeNumber: `EMP-${String(detail.employeeId).padStart(4, '0')}`,
                    position: 'Desarrollador', // Mock
                    baseSalary: 10000, // Mock
                    totalPerceptions: 0,
                    totalDeductions: 0,
                    netAmount: 0,
                    details: []
                })
            }

            const employee = employeeMap.get(detail.employeeId)!
            employee.details.push(detail)

            if (detail.type === 'percepcion') {
                employee.totalPerceptions += detail.amount
            } else {
                employee.totalDeductions += detail.amount
            }
        })

        // Calculate net amount for each employee
        const employees = Array.from(employeeMap.values()).map(emp => ({
            ...emp,
            netAmount: emp.totalPerceptions - emp.totalDeductions
        }))

        // Calculate period totals
        const totalPerceptions = employees.reduce((sum, emp) => sum + emp.totalPerceptions, 0)
        const totalDeductions = employees.reduce((sum, emp) => sum + emp.totalDeductions, 0)

        return {
            periodId,
            periodName: `Nómina Quincenal ${periodId}`,
            startDate: '2025-01-01',
            endDate: '2025-01-15',
            status: periodId === 1 ? 'borrador' : 'calculada', // Mock: período 1 es borrador, resto calculada
            totalEmployees: employees.length,
            totalPerceptions,
            totalDeductions,
            totalNet: totalPerceptions - totalDeductions,
            employees
        }
    }

    const createPayrollDetail = async (
        data: PayrollDetailFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newDetail: PayrollDetailDTO = {
            id: mockPayrollDetails.length + 1,
            ...data
        }

        mockPayrollDetails.push(newDetail)

        return {
            message: 'Concepto agregado exitosamente',
            status: 'success',
            data: newDetail
        }
    }

    const updatePayrollDetail = async (
        data: PayrollDetailFormDTO
    ): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const index = mockPayrollDetails.findIndex((detail) => detail.id === data.id)

        if (index !== -1) {
            mockPayrollDetails[index] = {
                ...mockPayrollDetails[index],
                ...data
            }

            return {
                message: 'Concepto actualizado exitosamente',
                status: 'success',
                data: mockPayrollDetails[index]
            }
        }

        return {
            message: 'Concepto no encontrado',
            status: 'error',
            data: null
        }
    }

    const deletePayrollDetail = async (): Promise<{ message: string; status: string; data: any }> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const id = payrollDetailStore.selectedPayrollDetail?.id

        if (!id) {
            return {
                message: 'ID de concepto no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockPayrollDetails.findIndex((detail) => detail.id === id)

        if (index !== -1) {
            const deleted = mockPayrollDetails.splice(index, 1)
            return {
                message: 'Concepto eliminado exitosamente',
                status: 'success',
                data: deleted[0]
            }
        }

        return {
            message: 'Concepto no encontrado',
            status: 'error',
            data: null
        }
    }

    return {
        getPayrollPeriodSummary,
        createPayrollDetail,
        updatePayrollDetail,
        deletePayrollDetail
    }
}
