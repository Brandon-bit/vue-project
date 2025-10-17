import type { FixedAssetType, FixedAssetFormType, FixedAssetResponseType } from '@/modules/Contabilidad/ActivosFijos/types/fixedAssetsTypes'
import { mapFixedAsset, mapFixedAssetRequest } from '@/modules/Contabilidad/ActivosFijos/composables/mappingFixedAssetsData'
import useFixedAssetsStore from '@/modules/Contabilidad/ActivosFijos/store/fixedAssetsStore'

// Mock data
const mockFixedAssets: FixedAssetResponseType[] = [
    {
        id: 'AF-001',
        descripcion: 'Servidor Dell PowerEdge R740',
        marca: 'Dell',
        modelo: 'PowerEdge R740',
        numeroSerie: 'SN123456789',
        fechaAdquisicion: '2023-01-15',
        proveedor: 'Dell Technologies',
        factura: 'FACT-2023-001',
        valorOriginal: 85000,
        vidaUtil: 60,
        cuentaContable: '1201-001',
        ubicacionFisica: 'Centro de Datos - Piso 3',
        area: 'Tecnología',
        responsable: 'Juan Pérez',
        notas: 'Servidor principal para aplicaciones empresariales',
        estatus: 'Activo',
        fechaCreacion: new Date('2023-01-15')
    },
    {
        id: 'AF-002',
        descripcion: 'Vehículo Toyota Hilux 2023',
        marca: 'Toyota',
        modelo: 'Hilux 2023',
        numeroSerie: 'VIN987654321',
        fechaAdquisicion: '2023-03-20',
        proveedor: 'Toyota México',
        factura: 'FACT-2023-045',
        valorOriginal: 450000,
        vidaUtil: 120,
        cuentaContable: '1202-001',
        ubicacionFisica: 'Estacionamiento Principal',
        area: 'Ventas',
        responsable: 'María González',
        notas: 'Vehículo asignado al equipo de ventas',
        estatus: 'Activo',
        fechaCreacion: new Date('2023-03-20')
    },
    {
        id: 'AF-003',
        descripcion: 'Equipo de aire acondicionado industrial',
        marca: 'Carrier',
        modelo: 'Industrial 5000',
        numeroSerie: 'AC456789123',
        fechaAdquisicion: '2022-11-10',
        proveedor: 'Climatización Industrial SA',
        factura: 'FACT-2022-234',
        valorOriginal: 125000,
        vidaUtil: 84,
        cuentaContable: '1203-001',
        ubicacionFisica: 'Planta Producción - Nave 2',
        area: 'Mantenimiento',
        responsable: 'Carlos Ruiz',
        notas: 'Sistema de climatización para área de producción',
        estatus: 'Activo',
        fechaCreacion: new Date('2022-11-10')
    },
    {
        id: 'AF-004',
        descripcion: 'Impresora HP LaserJet Enterprise',
        marca: 'HP',
        modelo: 'LaserJet Enterprise M608',
        numeroSerie: 'HP789456123',
        fechaAdquisicion: '2021-08-05',
        proveedor: 'HP Inc.',
        factura: 'FACT-2021-156',
        valorOriginal: 15000,
        vidaUtil: 36,
        cuentaContable: '1201-002',
        ubicacionFisica: 'Almacén General',
        area: 'Administración',
        responsable: 'Ana López',
        notas: 'Equipo dado de baja por obsolescencia',
        estatus: 'Dado de baja',
        fechaCreacion: new Date('2021-08-05')
    },
    {
        id: 'AF-005',
        descripcion: 'Escritorio ejecutivo de madera',
        marca: 'OfficeMax',
        modelo: 'Executive Pro',
        numeroSerie: 'OM123789456',
        fechaAdquisicion: '2023-05-12',
        proveedor: 'Muebles de Oficina SA',
        factura: 'FACT-2023-089',
        valorOriginal: 8500,
        vidaUtil: 60,
        cuentaContable: '1203-002',
        ubicacionFisica: 'Oficina Dirección General',
        area: 'Administración',
        responsable: 'Roberto Martínez',
        notas: 'Mobiliario para oficina ejecutiva',
        estatus: 'Activo',
        fechaCreacion: new Date('2023-05-12')
    }
]

export const useFixedAssetsActions = () => {
    const fixedAssetsStore = useFixedAssetsStore()

    const getFixedAssets = async (
        page: number, 
        pageSize: number, 
        name: string = '', 
        area: string = '', 
        estatus: string = ''
    ): Promise<{ items: FixedAssetType[], total: number }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        let filteredAssets = [...mockFixedAssets]

        // Apply filters
        if (name) {
            filteredAssets = filteredAssets.filter(asset => 
                asset.descripcion.toLowerCase().includes(name.toLowerCase()) ||
                asset.id.toLowerCase().includes(name.toLowerCase())
            )
        }

        if (area && area !== 'todas') {
            filteredAssets = filteredAssets.filter(asset => 
                asset.area.toLowerCase() === area.toLowerCase()
            )
        }

        if (estatus && estatus !== 'todos') {
            const statusFilter = estatus === 'activo' ? 'Activo' : 'Dado de baja'
            filteredAssets = filteredAssets.filter(asset => 
                asset.estatus === statusFilter
            )
        }

        const total = filteredAssets.length
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedAssets = filteredAssets.slice(start, end)

        return {
            items: paginatedAssets.map(mapFixedAsset),
            total: total
        }
    }

    const getFixedAssetById = async (id: string): Promise<FixedAssetType> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const asset = mockFixedAssets.find(a => a.id === id)
        if (!asset) {
            throw new Error('Activo no encontrado')
        }

        return mapFixedAsset(asset)
    }

    const createFixedAsset = async (data: FixedAssetFormType): Promise<{ message: string, status: string, data: any }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        const requestData = mapFixedAssetRequest(data)
        
        // Simulate successful creation
        const newAsset: FixedAssetResponseType = {
            id: `AF-${String(mockFixedAssets.length + 1).padStart(3, '0')}`,
            ...requestData,
            fechaCreacion: new Date()
        }

        mockFixedAssets.push(newAsset)

        return {
            message: 'Activo fijo creado exitosamente',
            status: 'success',
            data: newAsset
        }
    }

    const updateFixedAsset = async (data: FixedAssetFormType): Promise<{ message: string, status: string, data: any }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        const id = fixedAssetsStore.selectedFixedAsset.id ?? ''
        const requestData = mapFixedAssetRequest(data)
        
        const index = mockFixedAssets.findIndex(a => a.id === id)
        if (index === -1) {
            return {
                message: 'Activo no encontrado',
                status: 'error',
                data: null
            }
        }

        mockFixedAssets[index] = {
            ...mockFixedAssets[index],
            ...requestData
        }

        return {
            message: 'Activo fijo actualizado exitosamente',
            status: 'success',
            data: mockFixedAssets[index]
        }
    }

    const deleteFixedAsset = async (): Promise<{ message: string, status: string, data: any }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const id = fixedAssetsStore.selectedFixedAsset?.id
        if (!id) {
            return {
                message: 'ID de activo no válido',
                status: 'error',
                data: null
            }
        }

        const index = mockFixedAssets.findIndex(a => a.id === id)
        if (index === -1) {
            return {
                message: 'Activo no encontrado',
                status: 'error',
                data: null
            }
        }

        mockFixedAssets.splice(index, 1)

        return {
            message: 'Activo fijo eliminado exitosamente',
            status: 'success',
            data: null
        }
    }

    const getFixedAssetsStats = async (): Promise<{
        totalAssets: number
        totalValue: number
        areasCount: number
        inactiveAssets: number
    }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const activeAssets = mockFixedAssets.filter(a => a.estatus === 'Activo')
        const totalValue = activeAssets.reduce((sum, a) => sum + a.valorOriginal, 0)
        const uniqueAreas = new Set(mockFixedAssets.map(a => a.area))
        const inactiveAssets = mockFixedAssets.filter(a => a.estatus === 'Dado de baja').length

        return {
            totalAssets: activeAssets.length,
            totalValue: totalValue,
            areasCount: uniqueAreas.size,
            inactiveAssets: inactiveAssets
        }
    }

    return { 
        getFixedAssets, 
        getFixedAssetById, 
        createFixedAsset, 
        updateFixedAsset, 
        deleteFixedAsset,
        getFixedAssetsStats
    }
}
