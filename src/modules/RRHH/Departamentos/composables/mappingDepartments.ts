import {
    Department,
    DepartmentDTO,
    DepartmentFormDTO,
    DepartmentRequest,
    SelectOptionDTO
} from '@/modules/RRHH/Departamentos/types/departmentTypes'

// Map backend response to frontend DTO
export const mapDepartmentDTO = (data: Department): DepartmentDTO => ({
    id: data.id,
    name: data.nombre,
    description: data.descripcion,
    active: data.activo
})

// Map frontend form to backend request
export const mapDepartmentRequest = (data: DepartmentFormDTO): DepartmentRequest => ({
    id: data.id,
    nombre: data.name,
    descripcion: data.description,
    activo: data.active
})

// Map department to select option
export const mapDepartmentToSelectOption = (data: DepartmentDTO): SelectOptionDTO => ({
    id: data.id!,
    label: data.name
})
