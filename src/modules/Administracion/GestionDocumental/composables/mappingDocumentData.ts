import type { 
    DocumentResponseType,
    DocumentFormType, 
    DocumentType
} from '@/modules/Administracion/GestionDocumental/types/documentTypes'

export const mapDocument = (model: DocumentResponseType): DocumentType => {
    return {
        id: model.id,
        name: model.nombre,
        category: model.categoria,
        size: model.tamaño,
        uploadDate: model.fechaSubida,
        uploadedBy: model.subidoPor,
        version: model.version,
        tags: model.tags,
        confidential: model.confidencial,
        fileUrl: model.archivoUrl,
        description: model.descripcion
    }
}

export const mapDocumentRequest = (model: DocumentFormType): FormData => {
    const formData = new FormData()
    
    formData.append('Nombre', model.name)
    formData.append('Categoria', model.category)
    formData.append('TipoDocumento', model.documentType)
    formData.append('Tags', model.tags || '')
    formData.append('Descripcion', model.description || '')
    formData.append('Confidencial', model.confidential.toString())
    
    if (model.file && model.file.length > 0) {
        formData.append('Archivo', model.file[0])
    }
    
    return formData
}
