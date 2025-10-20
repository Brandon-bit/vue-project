import { EmployeeBankInfo, DispersionValidation, DispersionRecord } from '@/modules/Nomina/DetalleNomina/types/dispersionTypes'
import { EmployeePayrollSummary } from '@/modules/Nomina/DetalleNomina/types/payrollDetailTypes'

export const usePayrollDispersion = () => {
    // Mock: Datos bancarios de empleados (en producción vendrían de RRHH/Empleados)
    const mockBankData: Record<number, { bankName: string; accountNumber: string; clabe?: string }> = {
        1: { bankName: 'BBVA', accountNumber: '012345678901234567', clabe: '012180001234567890' },
        2: { bankName: 'Santander', accountNumber: '098765432109876543', clabe: '014180009876543210' }
    }

    /**
     * Valida que los empleados tengan información bancaria completa
     */
    const validateDispersion = (employees: EmployeePayrollSummary[]): DispersionValidation => {
        const errors: string[] = []
        const warnings: string[] = []
        const employeesWithoutAccount: EmployeeBankInfo[] = []
        const employeesReady: EmployeeBankInfo[] = []

        employees.forEach(emp => {
            const bankInfo = mockBankData[emp.employeeId]

            if (!bankInfo || !bankInfo.accountNumber) {
                employeesWithoutAccount.push({
                    employeeId: emp.employeeId,
                    employeeName: emp.employeeName,
                    bankName: 'N/A',
                    accountNumber: 'N/A',
                    netAmount: emp.netAmount
                })
                errors.push(`${emp.employeeName} no tiene cuenta bancaria registrada`)
            } else {
                // Validar longitud de cuenta (18 dígitos para CLABE)
                if (bankInfo.accountNumber.length !== 18) {
                    warnings.push(`${emp.employeeName}: Cuenta bancaria no tiene 18 dígitos`)
                }

                employeesReady.push({
                    employeeId: emp.employeeId,
                    employeeName: emp.employeeName,
                    bankName: bankInfo.bankName,
                    accountNumber: bankInfo.accountNumber,
                    clabe: bankInfo.clabe,
                    netAmount: emp.netAmount
                })
            }
        })

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            employeesWithoutAccount,
            employeesReady
        }
    }

    /**
     * Genera layout BBVA Bancomer
     * Formato: Longitud fija según especificaciones BBVA
     */
    const generateBBVALayout = (employees: EmployeeBankInfo[], empresaId: string = '12345678'): string => {
        let layout = ''
        const fecha = new Date().toISOString().split('T')[0].replace(/-/g, '')
        const totalEmpleados = employees.length
        const totalMonto = employees.reduce((sum, emp) => sum + emp.netAmount, 0)

        // Header (Tipo 01)
        layout += '01' // Tipo de registro
        layout += empresaId.padEnd(10, ' ') // ID Empresa
        layout += fecha // Fecha YYYYMMDD
        layout += 'NOMINA'.padEnd(20, ' ') // Descripción
        layout += '\n'

        // Detalle por empleado (Tipo 02)
        employees.forEach(emp => {
            layout += '02' // Tipo de registro
            layout += emp.accountNumber.padEnd(18, ' ') // CLABE
            layout += emp.employeeName.substring(0, 40).padEnd(40, ' ') // Nombre (max 40)
            layout += emp.netAmount.toFixed(2).replace('.', '').padStart(15, '0') // Monto sin decimales
            layout += '001' // Referencia numérica
            layout += '\n'
        })

        // Totales (Tipo 03)
        layout += '03' // Tipo de registro
        layout += totalEmpleados.toString().padStart(6, '0') // Total empleados
        layout += totalMonto.toFixed(2).replace('.', '').padStart(18, '0') // Total monto
        layout += '\n'

        return layout
    }

    /**
     * Genera layout Santander
     * Formato: CSV delimitado por pipes
     */
    const generateSantanderLayout = (employees: EmployeeBankInfo[], empresaCuenta: string = '0123456789'): string => {
        let layout = ''
        const fecha = new Date().toISOString().split('T')[0]

        // Header
        layout += `H|${empresaCuenta}|${fecha}|NOMINA|\n`

        // Detalle
        employees.forEach((emp, index) => {
            layout += `D|${index + 1}|${emp.accountNumber}|${emp.employeeName}|${emp.netAmount.toFixed(2)}|MXN|\n`
        })

        // Footer
        const total = employees.reduce((sum, emp) => sum + emp.netAmount, 0)
        layout += `F|${employees.length}|${total.toFixed(2)}|\n`

        return layout
    }

    /**
     * Genera layout Banorte
     * Formato: Texto delimitado por comas
     */
    const generateBanorteLayout = (employees: EmployeeBankInfo[]): string => {
        let layout = ''
        const fecha = new Date().toISOString().split('T')[0].replace(/-/g, '')

        employees.forEach(emp => {
            layout += [
                emp.accountNumber, // CLABE
                emp.netAmount.toFixed(2), // Monto
                emp.employeeName.substring(0, 30), // Nombre (max 30)
                fecha, // Fecha aplicación
                '01' // Tipo de pago (01 = Nómina)
            ].join(',') + '\n'
        })

        return layout
    }

    /**
     * Genera layout genérico CSV
     */
    const generateGenericCSV = (employees: EmployeeBankInfo[]): string => {
        let csv = 'CLABE,NOMBRE,MONTO,BANCO,REFERENCIA\n'

        employees.forEach(emp => {
            const row = [
                emp.accountNumber,
                `"${emp.employeeName}"`,
                emp.netAmount.toFixed(2),
                emp.bankName,
                'NOMINA'
            ].join(',')

            csv += row + '\n'
        })

        return csv
    }

    /**
     * Genera archivo de texto plano legible
     * FORMATO: Lista detallada con formato legible
     */
    const generatePaymentTXT = (employees: EmployeeBankInfo[]): string => {
        let txt = 'DISPERSIÓN DE NÓMINA\n'
        txt += '='.repeat(80) + '\n\n'

        employees.forEach((emp, index) => {
            txt += `${index + 1}. ${emp.employeeName}\n`
            txt += `   Banco: ${emp.bankName}\n`
            txt += `   Cuenta: ${emp.accountNumber}\n`
            txt += `   Monto: $${emp.netAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n\n`
        })

        const total = employees.reduce((sum, emp) => sum + emp.netAmount, 0)
        txt += '='.repeat(80) + '\n'
        txt += `TOTAL: ${employees.length} empleados - $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n`

        return txt
    }

    /**
     * Descarga archivo en el navegador
     */
    const downloadFile = (content: string, fileName: string, mimeType: string = 'text/csv') => {
        const blob = new Blob([content], { type: mimeType })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(url)
    }

    /**
     * Exporta layout según el banco seleccionado
     */
    const exportBankLayout = (
        periodId: number,
        employees: EmployeeBankInfo[],
        bankType: 'BBVA' | 'Santander' | 'Banorte' | 'Generico'
    ): string => {
        let content = ''
        let fileName = ''
        let extension = '.txt'

        switch (bankType) {
            case 'BBVA':
                content = generateBBVALayout(employees)
                fileName = `BBVA_NOMINA_${periodId}_${new Date().toISOString().split('T')[0]}.txt`
                break
            case 'Santander':
                content = generateSantanderLayout(employees)
                fileName = `SANTANDER_NOMINA_${periodId}_${new Date().toISOString().split('T')[0]}.txt`
                break
            case 'Banorte':
                content = generateBanorteLayout(employees)
                fileName = `BANORTE_NOMINA_${periodId}_${new Date().toISOString().split('T')[0]}.txt`
                break
            case 'Generico':
                content = generateGenericCSV(employees)
                fileName = `NOMINA_${periodId}_${new Date().toISOString().split('T')[0]}.csv`
                extension = '.csv'
                break
        }

        const mimeType = extension === '.csv' ? 'text/csv;charset=utf-8;' : 'text/plain;charset=utf-8;'
        downloadFile(content, fileName, mimeType)
        return fileName
    }


    /**
     * Registra la dispersión (mock - en producción se guarda en BD)
     */
    const registerDispersion = async (
        periodId: number,
        periodName: string,
        fileName: string,
        totalEmployees: number,
        totalAmount: number
    ): Promise<DispersionRecord> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const record: DispersionRecord = {
            id: Date.now(),
            periodId,
            periodName,
            fileName,
            totalEmployees,
            totalAmount,
            generatedBy: 'Usuario Admin', // En producción: usuario actual
            generatedAt: new Date().toISOString(),
            status: 'generado'
        }

        console.log('✅ Dispersión registrada:', record)
        console.log('📄 Archivo generado:', fileName)
        console.log('💰 Total dispersado:', `$${totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`)
        
        return record
    }

    return {
        validateDispersion,
        generateBBVALayout,
        generateSantanderLayout,
        generateBanorteLayout,
        generateGenericCSV,
        generatePaymentTXT,
        exportBankLayout,
        registerDispersion
    }
}
