import { mapCompanyRequest } from '@/modules/RRHH/AltaEmpresas/composables/mappingCompanies'
import { CompanyRequest, CompanyDTO, DepartmentDTO } from '@/modules/RRHH/AltaEmpresas/types/companyTypes'

// Mock data for simulation
const mockCompanies: CompanyDTO[] = [
    {
        id: 1,
        businessName: 'Grupo Financiero Principal',
        taxId: 'GFP123456789',
        fiscalAddress: 'Av. Reforma 123, Col. Centro, CDMX',
        initialVacationDays: 12,
        payrollPolicy: 'Quincenal',
        satCertificate: null,
        csdPassword: '',
        active: true
    },
    {
        id: 2,
        businessName: 'Servicios Corporativos S.A.',
        taxId: 'SCS987654321',
        fiscalAddress: 'Blvd. Insurgentes 456, Col. Roma, CDMX',
        initialVacationDays: 15,
        payrollPolicy: 'Mensual',
        satCertificate: null,
        csdPassword: '',
        active: true
    },
    {
        id: 3,
        businessName: 'Tech Solutions México',
        taxId: 'TSM456789123',
        fiscalAddress: 'Calle Tecnología 789, Col. Innovación, Guadalajara',
        initialVacationDays: 10,
        payrollPolicy: 'Semanal',
        satCertificate: null,
        csdPassword: '',
        active: false
    }
]

const payrollPolicyMap: { [key: string]: number } = {
    'Semanal': 1,
    'Quincenal': 2,
    'Mensual': 3
}

// Mock departments data
const mockDepartments: DepartmentDTO[] = [
    { id: 1, label: 'Dirección General' },
    { id: 2, label: 'Recursos Humanos' },
    { id: 3, label: 'Finanzas' },
    { id: 4, label: 'Operaciones' },
    { id: 5, label: 'Ventas' },
    { id: 6, label: 'Marketing' },
    { id: 7, label: 'Tecnología' },
    { id: 8, label: 'Logística' }
]

export const useCompanyActions = () => {
    const getCompanies = async (page: number, pageSize: number): Promise<{ items: any[], total: number }> => {
        console.log('Fetching companies - page:', page, 'pageSize:', pageSize)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/companies?page=${page}&pageSize=${pageSize}`)
        // return response.data
        
        // Simulate API response with pagination
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedItems = mockCompanies.slice(start, end)
        
        return {
            items: paginatedItems.map(company => ({
                ...company,
                payrollPolicyLabel: company.payrollPolicy,
                activeLabel: company.active ? 'Activa' : 'Inactiva'
            })),
            total: mockCompanies.length
        }
    }

    const getDepartments = async (): Promise<DepartmentDTO[]> => {
        console.log('Fetching departments')
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get('/departments')
        // return response.data.map(dept => ({ id: dept.id, label: dept.nombre }))
        
        // Simulate API response
        return mockDepartments
    }

    const getCompanyById = async (id: number): Promise<CompanyRequest> => {
        console.log('Fetching company by id:', id)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/companies/${id}`)
        // return mapCompanyDTO(response.data)
        
        // Simulate API response
        const company = mockCompanies.find(c => c.id === id)
        
        if (!company) {
            throw new Error('Company not found')
        }
        
        // Simulate some departments assigned to the company
        const assignedDepartments = id === 1 
            ? [mockDepartments[0], mockDepartments[1], mockDepartments[2]] // First 3 departments
            : id === 2 
            ? [mockDepartments[1], mockDepartments[4]] // HR and Sales
            : [mockDepartments[3]] // Operations only
        
        return {
            businessName: company.businessName,
            taxId: company.taxId,
            fiscalAddress: company.fiscalAddress,
            initialVacationDays: company.initialVacationDays,
            payrollPolicy: payrollPolicyMap[company.payrollPolicy] || 2,
            departments: assignedDepartments,
            csdPassword: company.csdPassword
        }
    }

    const createCompany = async (data: CompanyRequest) => {
        const payload = mapCompanyRequest(data)
        console.log('Creating company with payload:', payload)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.post('/companies', payload)
        // return response.data
        
        return {
            success: true,
            message: 'Empresa creada exitosamente',
            data: payload
        }
    }

    const updateCompany = async (id: number, data: CompanyRequest) => {
        const payload = mapCompanyRequest(data)
        console.log('Updating company with id:', id, 'and payload:', payload)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.put(`/companies/${id}`, payload)
        // return response.data
        
        return {
            success: true,
            message: 'Empresa actualizada exitosamente',
            data: payload
        }
    }

    return {
        getCompanies,
        getCompanyById,
        getDepartments,
        createCompany,
        updateCompany
    }
}
