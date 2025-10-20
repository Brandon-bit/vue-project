import { mapBranchRequest } from '@/modules/RRHH/Sucursales/composables/mappingBranch'
import {
    BranchRequest,
    BranchDTO
} from '@/modules/RRHH/Sucursales/types/branchTypes'

// Mock data for simulation
const mockBranches: BranchDTO[] = [
    // Grupo Financiero Principal (companyId: 1)
    {
        id: 1,
        companyId: 1,
        companyName: 'Grupo Financiero Principal',
        name: 'Sucursal Centro',
        address: 'Av. Juárez 123, Col. Centro, CDMX',
        phone: '5551234567',
        active: true
    },
    {
        id: 2,
        companyId: 1,
        companyName: 'Grupo Financiero Principal',
        name: 'Sucursal Norte',
        address: 'Av. Insurgentes Norte 456, Col. Lindavista, CDMX',
        phone: '5559876543',
        active: true
    },
    {
        id: 3,
        companyId: 1,
        companyName: 'Grupo Financiero Principal',
        name: 'Sucursal Polanco',
        address: 'Blvd. Reforma 789, Col. Polanco, CDMX',
        phone: '5558765432',
        active: true
    },
    {
        id: 4,
        companyId: 1,
        companyName: 'Grupo Financiero Principal',
        name: 'Sucursal Santa Fe',
        address: 'Av. Santa Fe 234, Col. Santa Fe, CDMX',
        phone: '5557654321',
        active: true
    },
    // Servicios Corporativos S.A. (companyId: 2)
    {
        id: 5,
        companyId: 2,
        companyName: 'Servicios Corporativos S.A.',
        name: 'Sucursal Sur',
        address: 'Calz. de Tlalpan 789, Col. Portales, CDMX',
        phone: '5556543210',
        active: true
    },
    {
        id: 6,
        companyId: 2,
        companyName: 'Servicios Corporativos S.A.',
        name: 'Sucursal Oriente',
        address: 'Av. Zaragoza 321, Col. Agrícola Oriental, CDMX',
        phone: '5554567890',
        active: true
    },
    {
        id: 7,
        companyId: 2,
        companyName: 'Servicios Corporativos S.A.',
        name: 'Sucursal Roma',
        address: 'Av. Insurgentes Sur 567, Col. Roma Norte, CDMX',
        phone: '5553456789',
        active: true
    },
    // Tech Solutions México (companyId: 3)
    {
        id: 8,
        companyId: 3,
        companyName: 'Tech Solutions México',
        name: 'Sucursal Guadalajara',
        address: 'Av. Chapultepec 555, Col. Americana, Guadalajara',
        phone: '3312345678',
        active: true
    },
    {
        id: 9,
        companyId: 3,
        companyName: 'Tech Solutions México',
        name: 'Sucursal Monterrey',
        address: 'Av. Constitución 890, Col. Centro, Monterrey',
        phone: '8187654321',
        active: true
    },
    {
        id: 10,
        companyId: 3,
        companyName: 'Tech Solutions México',
        name: 'Sucursal Querétaro',
        address: 'Blvd. Bernardo Quintana 432, Col. Centro Sur, Querétaro',
        phone: '4421234567',
        active: true
    }
]

export const useBranchActions = () => {
    const getBranches = async (
        page: number,
        pageSize: number
    ): Promise<{ items: any[]; total: number }> => {
        console.log('Fetching branches - page:', page, 'pageSize:', pageSize)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/branches?page=${page}&pageSize=${pageSize}`)
        // return response.data

        // Simulate API response with pagination
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedItems = mockBranches.slice(start, end)

        return {
            items: paginatedItems.map((branch) => ({
                ...branch,
                activeLabel: branch.active ? 'Activa' : 'Inactiva'
            })),
            total: mockBranches.length
        }
    }

    const getBranchesByCompany = async (companyId: number): Promise<BranchDTO[]> => {
        console.log('getBranchesByCompany called with companyId:', companyId, 'type:', typeof companyId)
        console.log('All mockBranches:', mockBranches)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/branches/company/${companyId}`)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Filter branches by company and only return active ones
        const filtered = mockBranches.filter(
            (branch) => {
                console.log(`Comparing branch.companyId (${branch.companyId}) === companyId (${companyId}):`, branch.companyId === companyId)
                return branch.companyId === companyId && branch.active
            }
        )
        console.log('Filtered branches result:', filtered)
        return filtered
    }

    const getBranchById = async (id: number): Promise<BranchRequest> => {
        console.log('Fetching branch by id:', id)

        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/branches/${id}`)
        // return mapBranchDTO(response.data)

        // Simulate API response
        const branch = mockBranches.find((b) => b.id === id)

        if (!branch) {
            throw new Error('Branch not found')
        }

        return {
            companyId: branch.companyId,
            name: branch.name,
            address: branch.address,
            phone: branch.phone,
            active: branch.active
        }
    }

    const createBranch = async (data: BranchRequest) => {
        const payload = mapBranchRequest(data)
        console.log('Creating branch with payload:', payload)

        // TODO: Implement axios call
        // const response = await axiosInstance.post('/branches', payload)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
            success: true,
            message: 'Sucursal creada exitosamente',
            status: 'success',
            data: payload
        }
    }

    const updateBranch = async (id: number, data: BranchRequest) => {
        const payload = mapBranchRequest(data)
        console.log('Updating branch with id:', id, 'and payload:', payload)

        // TODO: Implement axios call
        // const response = await axiosInstance.put(`/branches/${id}`, payload)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
            success: true,
            message: 'Sucursal actualizada exitosamente',
            status: 'success',
            data: payload
        }
    }

    const deleteBranch = async (id: number) => {
        console.log('Deleting branch with id:', id)

        // TODO: Implement axios call
        // const response = await axiosInstance.delete(`/branches/${id}`)
        // return response.data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return {
            success: true,
            message: 'Sucursal eliminada exitosamente',
            status: 'success'
        }
    }

    return {
        getBranches,
        getBranchesByCompany,
        getBranchById,
        createBranch,
        updateBranch,
        deleteBranch
    }
}
