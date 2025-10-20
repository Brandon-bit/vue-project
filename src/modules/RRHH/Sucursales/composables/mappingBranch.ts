import {
    Branch,
    BranchDTO,
    BranchRequest,
    BranchRequestPayload
} from '@/modules/RRHH/Sucursales/types/branchTypes'

// Map from backend (Spanish) to DTO (English)
export const mapBranch = (data: Branch, companyName: string = ''): BranchDTO => ({
    id: data.id,
    companyId: data.empresaId,
    companyName: companyName,
    name: data.nombre,
    address: data.direccion,
    phone: data.telefono,
    active: data.activo
})

// Map from DTO (English) to backend payload (Spanish)
export const mapBranchRequest = (data: BranchRequest): BranchRequestPayload => ({
    empresaId: data.companyId,
    nombre: data.name,
    direccion: data.address,
    telefono: data.phone,
    activo: data.active ?? true
})

// Map from backend payload (Spanish) to DTO (English)
export const mapBranchDTO = (data: BranchRequestPayload): BranchRequest => ({
    companyId: data.empresaId,
    name: data.nombre,
    address: data.direccion,
    phone: data.telefono,
    active: data.activo ?? true
})
