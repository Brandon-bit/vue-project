import { mapEmployeeRequest } from '@/modules/RRHH/AltaEmpleados/composables/mappingEmployees'
import { EmployeeRequest, EmployeeDTO, SelectOptionDTO } from '@/modules/RRHH/AltaEmpleados/types/employeeTypes'

// Mock data for simulation
const mockEmployees: EmployeeDTO[] = [
    {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez González',
        email: 'juan.perez@empresa.com',
        phone: '+52 555 123 4567',
        birthDate: '1990-01-01',
        taxId: 'PEGJ900101ABC',
        address: 'Calle Principal 123, Col. Centro, CDMX',
        employeeNumber: 'EMP-001',
        hireDate: '2025-01-01',
        company: 'Grupo Financiero Principal',
        department: 'Recursos Humanos',
        position: 'Analista de RH',
        salary: 15000,
        contractType: 'Tiempo Indeterminado',
        reportsTo: 'Carlos López',
        active: true
    },
    {
        id: 2,
        firstName: 'María',
        lastName: 'García Rodríguez',
        email: 'maria.garcia@empresa.com',
        phone: '+52 555 234 5678',
        birthDate: '1988-05-15',
        taxId: 'GARM880515XYZ',
        address: 'Av. Insurgentes 456, Col. Roma, CDMX',
        employeeNumber: 'EMP-002',
        hireDate: '2024-06-15',
        company: 'Servicios Corporativos S.A.',
        department: 'Finanzas',
        position: 'Contador Senior',
        salary: 25000,
        contractType: 'Tiempo Indeterminado',
        reportsTo: 'Director General',
        active: true
    },
    {
        id: 3,
        firstName: 'Carlos',
        lastName: 'López Martínez',
        email: 'carlos.lopez@empresa.com',
        phone: '+52 555 345 6789',
        birthDate: '1985-08-20',
        taxId: 'LOMC850820DEF',
        address: 'Blvd. Reforma 789, Col. Polanco, CDMX',
        employeeNumber: 'EMP-003',
        hireDate: '2023-03-10',
        company: 'Grupo Financiero Principal',
        department: 'Recursos Humanos',
        position: 'Gerente de RH',
        salary: 35000,
        contractType: 'Tiempo Indeterminado',
        reportsTo: null,
        active: true
    },
    {
        id: 4,
        firstName: 'Ana',
        lastName: 'Sánchez Torres',
        email: 'ana.sanchez@empresa.com',
        phone: '+52 555 456 7890',
        birthDate: '1992-11-30',
        taxId: 'SATA921130GHI',
        address: 'Calle Tecnología 321, Col. Innovación, Guadalajara',
        employeeNumber: 'EMP-004',
        hireDate: '2024-09-01',
        company: 'Servicios Corporativos S.A.',
        department: 'Operaciones',
        position: 'Coordinador de Operaciones',
        salary: 20000,
        contractType: 'Temporal',
        reportsTo: 'Director General',
        active: false
    },
    {
        id: 5,
        firstName: 'Luis',
        lastName: 'Hernández Torres',
        email: 'luis.hernandez@empresa.com',
        phone: '+52 555 567 8901',
        birthDate: '1991-07-12',
        taxId: 'HETL910712JKL',
        address: 'Av. Tecnología 555, Col. Silicon, CDMX',
        employeeNumber: 'EMP-005',
        hireDate: '2023-11-05',
        company: 'Tech Solutions México',
        department: 'Tecnología',
        position: 'Desarrollador Senior',
        salary: 30000,
        contractType: 'Tiempo Indeterminado',
        reportsTo: 'Carlos López',
        active: true
    },
    {
        id: 6,
        firstName: 'Patricia',
        lastName: 'Ramírez Flores',
        email: 'patricia.ramirez@empresa.com',
        phone: '+52 555 678 9012',
        birthDate: '1989-03-25',
        taxId: 'RAFP890325MNO',
        address: 'Calle Comercio 234, Col. Negocios, Monterrey',
        employeeNumber: 'EMP-006',
        hireDate: '2024-02-20',
        company: 'Grupo Financiero Principal',
        department: 'Ventas',
        position: 'Ejecutivo de Ventas',
        salary: 18000,
        contractType: 'Tiempo Indeterminado',
        reportsTo: 'Director General',
        active: true
    },
    {
        id: 7,
        firstName: 'Roberto',
        lastName: 'Díaz Morales',
        email: 'roberto.diaz@empresa.com',
        phone: '+52 555 789 0123',
        birthDate: '1987-12-08',
        taxId: 'DIMR871208PQR',
        address: 'Blvd. Marketing 678, Col. Publicidad, CDMX',
        employeeNumber: 'EMP-007',
        hireDate: '2023-08-15',
        company: 'Servicios Corporativos S.A.',
        department: 'Marketing',
        position: 'Gerente de Marketing',
        salary: 32000,
        contractType: 'Tiempo Indeterminado',
        reportsTo: null,
        active: true
    },
    {
        id: 8,
        firstName: 'Laura',
        lastName: 'Jiménez Castro',
        email: 'laura.jimenez@empresa.com',
        phone: '+52 555 890 1234',
        birthDate: '1993-06-18',
        taxId: 'JICL930618STU',
        address: 'Av. Logística 890, Col. Almacenes, Guadalajara',
        employeeNumber: 'EMP-008',
        hireDate: '2024-05-10',
        company: 'Tech Solutions México',
        department: 'Logística',
        position: 'Coordinador de Logística',
        salary: 22000,
        contractType: 'Temporal',
        reportsTo: 'Carlos López',
        active: true
    }
]

// Status types for employees
type EmployeeStatus = 'active' | 'vacation' | 'inactive'

// Extended mock employees with status
const mockEmployeesWithStatus = mockEmployees.map((emp, index) => {
    let status: EmployeeStatus = 'active'
    if (!emp.active) {
        status = 'inactive'
    } else if (index === 5) { // Patricia on vacation
        status = 'vacation'
    }
    return { ...emp, status }
})

// Mock companies data
const mockCompanies: SelectOptionDTO[] = [
    { id: 1, label: 'Grupo Financiero Principal' },
    { id: 2, label: 'Servicios Corporativos S.A.' },
    { id: 3, label: 'Tech Solutions México' }
]

// Mock departments data
const mockDepartments: SelectOptionDTO[] = [
    { id: 1, label: 'Dirección General' },
    { id: 2, label: 'Recursos Humanos' },
    { id: 3, label: 'Finanzas' },
    { id: 4, label: 'Operaciones' },
    { id: 5, label: 'Ventas' },
    { id: 6, label: 'Marketing' },
    { id: 7, label: 'Tecnología' },
    { id: 8, label: 'Logística' }
]

// Mock contract types
const mockContractTypes: SelectOptionDTO[] = [
    { id: 1, label: 'Tiempo Indeterminado' },
    { id: 2, label: 'Temporal' },
    { id: 3, label: 'Por Proyecto' }
]

// Mock supervisors/managers
const mockSupervisors: SelectOptionDTO[] = [
    { id: 1, label: 'María García - Director General' },
    { id: 2, label: 'Carlos López - Gerente de RH' },
    { id: 3, label: 'Pedro Ramírez - Gerente de Finanzas' }
]

// Map contract type ID to label
const contractTypeMap: { [key: number]: string } = {
    1: 'Tiempo Indeterminado',
    2: 'Temporal',
    3: 'Por Proyecto'
}

export const useEmployeeActions = () => {
    const getEmployees = async (page: number, pageSize: number): Promise<{ items: any[], total: number }> => {
        console.log('Fetching employees - page:', page, 'pageSize:', pageSize)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/employees?page=${page}&pageSize=${pageSize}`)
        // return response.data
        
        // Simulate API response with pagination
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedItems = mockEmployees.slice(start, end)
        
        return {
            items: paginatedItems.map(employee => ({
                ...employee,
                fullName: `${employee.firstName} ${employee.lastName}`,
                activeLabel: employee.active ? 'Activo' : 'Inactivo'
            })),
            total: mockEmployees.length
        }
    }

    const getEmployeeById = async (id: number): Promise<EmployeeRequest> => {
        console.log('Fetching employee by id:', id)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get(`/employees/${id}`)
        // return mapEmployeeDTO(response.data)
        
        // Simulate API response
        const employee = mockEmployees.find(e => e.id === id)
        
        if (!employee) {
            throw new Error('Employee not found')
        }
        
        // Map to request format
        return {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            birthDate: employee.birthDate,
            taxId: employee.taxId,
            address: employee.address,
            hireDate: employee.hireDate,
            company: mockCompanies.find(c => c.label === employee.company)?.id as number || 1,
            department: mockDepartments.find(d => d.label === employee.department)?.id as number || 2,
            position: employee.position,
            salary: employee.salary,
            contractType: Object.keys(contractTypeMap).find(
                key => contractTypeMap[Number(key)] === employee.contractType
            ) as unknown as number || 1,
            reportsTo: employee.reportsTo ? 
                mockSupervisors.find(s => s.label.includes(employee.reportsTo as string))?.id as number : 
                undefined
        }
    }

    const getCompanies = async (): Promise<SelectOptionDTO[]> => {
        console.log('Fetching companies')
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get('/companies')
        // return response.data.map(company => ({ id: company.id, label: company.razonSocial }))
        
        return mockCompanies
    }

    const getDepartments = async (): Promise<SelectOptionDTO[]> => {
        console.log('Fetching departments')
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get('/departments')
        // return response.data.map(dept => ({ id: dept.id, label: dept.nombre }))
        
        return mockDepartments
    }

    const getContractTypes = async (): Promise<SelectOptionDTO[]> => {
        console.log('Fetching contract types')
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get('/contract-types')
        // return response.data.map(type => ({ id: type.id, label: type.nombre }))
        
        return mockContractTypes
    }

    const getSupervisors = async (): Promise<SelectOptionDTO[]> => {
        console.log('Fetching supervisors')
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get('/supervisors')
        // return response.data.map(sup => ({ id: sup.id, label: `${sup.nombre} - ${sup.puesto}` }))
        
        return mockSupervisors
    }

    const createEmployee = async (data: EmployeeRequest) => {
        const payload = mapEmployeeRequest(data)
        console.log('Creating employee with payload:', payload)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.post('/employees', payload)
        // return response.data
        
        return {
            success: true,
            message: 'Empleado creado exitosamente',
            data: payload
        }
    }

    const updateEmployee = async (id: number, data: EmployeeRequest) => {
        const payload = mapEmployeeRequest(data)
        console.log('Updating employee with id:', id, 'and payload:', payload)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.put(`/employees/${id}`, payload)
        // return response.data
        
        return {
            success: true,
            message: 'Empleado actualizado exitosamente',
            data: payload
        }
    }

    const deleteEmployee = async (id: number) => {
        console.log('Deleting employee with id:', id)
        
        // TODO: Implement axios call
        // const response = await axiosInstance.delete(`/employees/${id}`)
        // return response.data
        
        return {
            success: true,
            message: 'Empleado eliminado exitosamente'
        }
    }

    const getEmployeeStats = async () => {
        console.log('Fetching employee statistics')
        
        // TODO: Implement axios call
        // const response = await axiosInstance.get('/employees/stats')
        // return response.data
        
        // Calculate stats from mock data
        const total = mockEmployeesWithStatus.length
        const active = mockEmployeesWithStatus.filter(emp => emp.status === 'active').length
        const onVacation = mockEmployeesWithStatus.filter(emp => emp.status === 'vacation').length
        const inactive = mockEmployeesWithStatus.filter(emp => emp.status === 'inactive').length
        
        return {
            total,
            active,
            onVacation,
            inactive
        }
    }

    return {
        getEmployees,
        getEmployeeById,
        getCompanies,
        getDepartments,
        getContractTypes,
        getSupervisors,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeStats
    }
}
