import { defineStore } from 'pinia'
import type { DocumentType, TabType } from '@/modules/Administracion/GestionDocumental/types/documentTypes'

const initialDocument: DocumentType = {
    id: undefined,
    name: '',
    category: '',
    size: '',
    uploadDate: new Date(),
    uploadedBy: '',
    version: 'v1',
    tags: [],
    confidential: false,
    fileUrl: '',
    description: ''
}

const useDocumentStore = defineStore('document-store', {
    state: () => ({
        selectedDocument: initialDocument as DocumentType,
        modalId: 'document-modal',
        activeTab: 'all' as TabType,
        searchQuery: '',
        selectedCategory: 'all'
    }),
    actions: {
        setData(data: DocumentType = initialDocument) {
            this.selectedDocument = data
        },
        setActiveTab(tab: TabType) {
            this.activeTab = tab
        },
        setSearchQuery(query: string) {
            this.searchQuery = query
        },
        setSelectedCategory(category: string) {
            this.selectedCategory = category
        }
    }
})

export default useDocumentStore
