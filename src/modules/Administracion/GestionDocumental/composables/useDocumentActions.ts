import type { DocumentResponseType, DocumentFormType, DocumentType } from '@/modules/Administracion/GestionDocumental/types/documentTypes'
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'
import { 
    uploadDocumentService, 
    deleteDocumentService, 
    updateDocumentService, 
    getDocumentsService,
    downloadDocumentService
} from '@/modules/Administracion/GestionDocumental/services/documentService'
import { mapDocument, mapDocumentRequest } from '@/modules/Administracion/GestionDocumental/composables/mappingDocumentData'

export const useDocumentActions = () => {
    
    const documentStore = useDocumentStore()

    const getDocuments = async (params?: any): Promise<DocumentType[]> => {
        const response = await getDocumentsService(params)
        return response.data.map(mapDocument)
    }

    const uploadDocument = async (data: DocumentFormType): Promise<{ message: string, status: string, data: DocumentResponseType }> => {
        const formData = mapDocumentRequest(data)
        const response = await uploadDocumentService(formData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const editDocument = async (data: DocumentFormType): Promise<{ message: string, status: string, data: DocumentResponseType }> => {
        const formData = mapDocumentRequest(data)
        const id = documentStore.selectedDocument.id ?? 0
        const response = await updateDocumentService(id, formData)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const deleteDocument = async (): Promise<{ message: string, status: string, data: DocumentResponseType }> => {
        let id = documentStore.selectedDocument?.id
        if (id == undefined) id = 0
        const response = await deleteDocumentService(id)
        return {
            message: response.message,
            status: response.success ? "success" : "error",
            data: response.data
        }
    }

    const downloadDocument = async (id: number, filename: string): Promise<void> => {
        const blob = await downloadDocumentService(id)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    return { uploadDocument, editDocument, deleteDocument, getDocuments, downloadDocument }
}
