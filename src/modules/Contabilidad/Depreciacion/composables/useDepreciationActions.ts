import type { DepreciableAssetType } from '@/modules/Contabilidad/Depreciacion/types/depreciationTypes'

// Mock data de activos depreciables
const mockDepreciableAssets: DepreciableAssetType[] = [
    {
        id: 'AF-001',
        description: 'Servidor Dell PowerEdge R740',
        originalValue: 85000,
        accumulatedDepreciation: 12750,
        usefulLife: 60,
        depreciatedMonths: 9,
        monthlyDepreciation: 1416.67
    },
    {
        id: 'AF-002',
        description: 'Vehículo Toyota Hilux 2023',
        originalValue: 450000,
        accumulatedDepreciation: 45000,
        usefulLife: 60,
        depreciatedMonths: 6,
        monthlyDepreciation: 7500
    },
    {
        id: 'AF-003',
        description: 'Equipo de aire acondicionado industrial',
        originalValue: 125000,
        accumulatedDepreciation: 20833.33,
        usefulLife: 72,
        depreciatedMonths: 12,
        monthlyDepreciation: 1736.11
    }
]

export const useDepreciationActions = () => {
    /**
     * Calcula la depreciación del periodo seleccionado
     */
    const calculateDepreciation = async (month: string, year: string, method: string): Promise<DepreciableAssetType[]> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Calculating depreciation for:', { month, year, method })
        
        // En producción, aquí se haría el cálculo real basado en el método seleccionado
        return mockDepreciableAssets
    }

    /**
     * Genera la póliza contable de depreciación
     */
    const generateDepreciationPolicy = async (month: string, year: string, assets: DepreciableAssetType[]): Promise<{ folio: string; message: string }> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const folio = `D-DEP-${year}${month}`
        console.log('Generating depreciation policy:', { folio, assets })
        
        return {
            folio,
            message: `Póliza de depreciación ${folio} generada exitosamente`
        }
    }

    /**
     * Descarga el reporte anual de depreciación en PDF
     */
    const downloadAnnualDepreciationReport = async (year: string): Promise<void> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Downloading annual depreciation report for year:', year)
        
        // En producción, aquí se haría la llamada al backend para generar y descargar el PDF
        // Ejemplo:
        // const response = await axiosApiInstance.get(`/api/reportes/depreciacion-anual/${year}`, {
        //     responseType: 'blob'
        // })
        // const url = window.URL.createObjectURL(new Blob([response.data]))
        // const link = document.createElement('a')
        // link.href = url
        // link.setAttribute('download', `reporte-depreciacion-anual-${year}.pdf`)
        // document.body.appendChild(link)
        // link.click()
        // link.remove()
    }

    /**
     * Descarga el reporte de conciliación contable-fiscal en PDF
     */
    const downloadAccountingTaxReconciliationReport = async (year: string): Promise<void> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Downloading accounting-tax reconciliation report for year:', year)
        
        // En producción, aquí se haría la llamada al backend para generar y descargar el PDF
    }

    /**
     * Descarga el historial de depreciaciones en PDF
     */
    const downloadDepreciationHistoryReport = async (): Promise<void> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Downloading depreciation history report')
        
        // En producción, aquí se haría la llamada al backend para generar y descargar el PDF
    }

    return {
        calculateDepreciation,
        generateDepreciationPolicy,
        downloadAnnualDepreciationReport,
        downloadAccountingTaxReconciliationReport,
        downloadDepreciationHistoryReport
    }
}
