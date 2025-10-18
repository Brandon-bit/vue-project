export type DocumentType = {
    id?: number
    name: string
    category: string
    size: string
    uploadDate: Date
    uploadedBy: string
    version: string
    tags: string[]
    confidential: boolean
    fileUrl?: string
    description?: string
}

export type DocumentResponseType = {
    id: number
    nombre: string
    categoria: string
    tamaño: string
    fechaSubida: Date
    subidoPor: string
    version: string
    tags: string[]
    confidencial: boolean
    archivoUrl: string
    descripcion: string
    activo: boolean
    eliminado: boolean
}

export type DocumentFormType = {
    name: string
    category: string
    documentType: string
    tags: string
    description: string
    confidential: boolean
    file?: FileList
}

export type CategoryType = {
    id: string
    name: string
    count: number
    color: string
}

export type DocumentStatsType = {
    totalDocuments: number
    uploadedThisMonth: number
    confidential: number
    pendingReview: number
}

export type TabType = 'all' | 'recent' | 'confidential'
