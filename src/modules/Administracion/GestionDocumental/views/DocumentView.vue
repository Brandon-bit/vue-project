<script setup lang="ts">
import { ref, computed, h } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import DocumentModal from '@/modules/Administracion/GestionDocumental/components/DocumentModal.vue'
import CategoryCard from '@/modules/Administracion/GestionDocumental/components/CategoryCard.vue'
import StatsCard from '@/modules/Administracion/GestionDocumental/components/StatsCard.vue'
import useDocumentStore from '@/modules/Administracion/GestionDocumental/store/documentStore'
import type { DocumentType, CategoryType, TabType } from '@/modules/Administracion/GestionDocumental/types/documentTypes'

const documentStore = useDocumentStore()
const modalStore = useModalStore()

const tablaRef = ref()

const categories: CategoryType[] = [
    { id: 'contratos', name: 'Contratos', count: 45, color: 'text-blue-500' },
    { id: 'facturas', name: 'Facturas', count: 234, color: 'text-green-500' },
    { id: 'nomina', name: 'Nómina', count: 89, color: 'text-purple-500' },
    { id: 'rh', name: 'RH', count: 156, color: 'text-orange-500' },
    { id: 'legal', name: 'Legal', count: 67, color: 'text-red-500' },
    { id: 'otros', name: 'Otros', count: 123, color: 'text-gray-500' }
]

const openUploadModal = () => {
    documentStore.setData()
    modalStore.open(documentStore.modalId, { type: 'CREATE', title: 'Subir Nuevo Documento' })
}

// Mock data - documentos simulados
const documents = ref<DocumentType[]>([
    { 
        id: 1, 
        name: 'Contrato_Arrendamiento_2025.pdf', 
        category: 'Contratos', 
        size: '2.3 MB', 
        uploadDate: new Date('2025-01-10'), 
        uploadedBy: 'María García', 
        version: 'v2', 
        tags: ['Inmuebles', 'Vigente'], 
        confidential: true 
    },
    { 
        id: 2, 
        name: 'Factura_A_1234.xml', 
        category: 'Facturas', 
        size: '45 KB', 
        uploadDate: new Date('2025-01-09'), 
        uploadedBy: 'Sistema Automático', 
        version: 'v1', 
        tags: ['CFDI', 'Enero'], 
        confidential: false 
    },
    { 
        id: 3, 
        name: 'Nomina_Diciembre_2024.xlsx', 
        category: 'Nómina', 
        size: '1.8 MB', 
        uploadDate: new Date('2025-01-05'), 
        uploadedBy: 'Juan Pérez', 
        version: 'v1', 
        tags: ['2024', 'Quincenal'], 
        confidential: true 
    },
    { 
        id: 4, 
        name: 'Expediente_Empleado_1023.pdf', 
        category: 'RH', 
        size: '5.6 MB', 
        uploadDate: new Date('2025-01-03'), 
        uploadedBy: 'Ana Martínez', 
        version: 'v3', 
        tags: ['Onboarding', 'Documentación'], 
        confidential: true 
    },
    { 
        id: 5, 
        name: 'Poder_Notarial_2024.pdf', 
        category: 'Legal', 
        size: '3.2 MB', 
        uploadDate: new Date('2024-12-28'), 
        uploadedBy: 'Carlos López', 
        version: 'v1', 
        tags: ['Notarial', 'Legal'], 
        confidential: true 
    }
])

const recentDocuments = computed(() => {
    return documents.value.slice(0, 3)
})

const confidentialDocuments = computed(() => {
    return documents.value.filter(doc => doc.confidential)
})

const activeTab = ref<TabType>('all')

const openViewModal = (doc: DocumentType) => {
    documentStore.setData(doc)
    modalStore.open(documentStore.modalId, { type: 'VIEW', title: doc.name })
}

const openDeleteModal = (doc: DocumentType) => {
    documentStore.setData(doc)
    modalStore.open(documentStore.modalId, { type: 'DELETE', title: 'Eliminar Documento' })
}

const handleDownload = (doc: DocumentType) => {
    console.log('Descargando:', doc.name)
    alert(`Descargando: ${doc.name}`)
}

const refreshAll = () => {
    console.log('Refrescando datos...')
}

// Definir columnas para BaseTable
const columns = [
    {
        key: 'name',
        label: 'Documento',
        render: (row: DocumentType) => {
            return h('div', { class: 'flex items-center gap-2' }, [
                h('span', { class: 'material-symbols-outlined text-base-content/70' }, 'description'),
                h('div', {}, [
                    h('p', { class: 'font-medium' }, row.name),
                    h('p', { class: 'text-xs text-base-content/70' }, row.version),
                    row.confidential ? h('span', { 
                        class: 'material-symbols-outlined text-error text-xs ml-1' 
                    }, 'lock') : null
                ])
            ])
        }
    },
    {
        key: 'category',
        label: 'Categoría',
        render: (row: DocumentType) => {
            return h('span', { class: 'badge badge-outline' }, row.category)
        }
    },
    {
        key: 'size',
        label: 'Tamaño',
        render: (row: DocumentType) => {
            return h('span', { class: 'text-sm' }, row.size)
        }
    },
    {
        key: 'uploadDate',
        label: 'Fecha',
        render: (row: DocumentType) => {
            return h('span', { class: 'text-sm' }, new Date(row.uploadDate).toLocaleDateString())
        }
    },
    {
        key: 'uploadedBy',
        label: 'Subido Por',
        render: (row: DocumentType) => {
            return h('span', { class: 'text-sm' }, row.uploadedBy)
        }
    },
    {
        key: 'tags',
        label: 'Tags',
        render: (row: DocumentType) => {
            return h('div', { class: 'flex gap-1 flex-wrap' }, 
                row.tags.map(tag => 
                    h('span', { class: 'badge badge-secondary badge-sm' }, tag)
                )
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        render: (row: DocumentType) => {
            return h('div', { class: 'flex gap-1' }, [
                h('button', {
                    class: 'btn btn-ghost btn-sm btn-square',
                    onClick: () => openViewModal(row)
                }, h('span', { class: 'material-symbols-outlined text-lg' }, 'visibility')),
                h('button', {
                    class: 'btn btn-ghost btn-sm btn-square',
                    onClick: () => handleDownload(row)
                }, h('span', { class: 'material-symbols-outlined text-lg' }, 'download')),
                h('button', {
                    class: 'btn btn-ghost btn-sm btn-square',
                    onClick: () => openDeleteModal(row)
                }, h('span', { class: 'material-symbols-outlined text-lg' }, 'delete'))
            ])
        }
    }
]
</script>

<template>
    <BaseTitle 
        title="Gestión Documental" 
        subtitle="Repositorio centralizado de documentos corporativos"
    />

    <div class="mb-6 flex justify-end">
        <BaseButton text="Subir Documento" @click="openUploadModal" icon="upload" />
    </div>

    <!-- Categorías Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category"
        />
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard 
            label="Total Documentos"
            value="714"
            icon="description"
            color="text-blue-500"
        />
        <StatsCard 
            label="Subidos Este Mes"
            value="47"
            icon="upload"
            color="text-green-500"
        />
        <StatsCard 
            label="Confidenciales"
            value="189"
            icon="lock"
            color="text-red-500"
        />
        <StatsCard 
            label="Pendientes Revisión"
            value="12"
            icon="error"
            color="text-yellow-500"
        />
    </div>


    <!-- Tabs -->
    <div class="mb-6">
        <div role="tablist" class="tabs tabs-boxed bg-base-200 w-fit">
            <a 
                role="tab" 
                :class="['tab', { 'tab-active': activeTab === 'all' }]"
                @click="activeTab = 'all'"
            >
                Todos los Documentos
            </a>
            <a 
                role="tab" 
                :class="['tab', { 'tab-active': activeTab === 'recent' }]"
                @click="activeTab = 'recent'"
            >
                Recientes
            </a>
            <a 
                role="tab" 
                :class="['tab', { 'tab-active': activeTab === 'confidential' }]"
                @click="activeTab = 'confidential'"
            >
                Confidenciales
            </a>
        </div>
    </div>

    <!-- Tab Content: Todos -->
    <div v-show="activeTab === 'all'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Repositorio de Documentos</h2>
            <p class="text-sm text-base-content/70 mb-4">Todos los documentos almacenados en el sistema</p>
            
            <BaseTable 
                ref="tablaRef"
                :columns="columns"
                :data="documents"
                :showSearch="false"
                @refresh="refreshAll"
            />
        </div>
    </div>

    <!-- Tab Content: Recientes -->
    <div v-show="activeTab === 'recent'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Documentos Recientes</h2>
            <p class="text-sm text-base-content/70 mb-4">Últimos documentos subidos al sistema</p>
            
            <div class="space-y-3">
                <div 
                    v-for="doc in recentDocuments" 
                    :key="doc.id" 
                    class="flex items-center justify-between p-4 border rounded-lg hover:bg-base-200 transition-colors"
                >
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-4xl text-base-content/70">description</span>
                        <div>
                            <p class="font-medium">{{ doc.name }}</p>
                            <p class="text-sm text-base-content/70">
                                {{ doc.category }} • {{ new Date(doc.uploadDate).toLocaleDateString() }}
                            </p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button class="btn btn-ghost btn-sm" @click="openViewModal(doc)">
                            <span class="material-symbols-outlined">visibility</span>
                        </button>
                        <button class="btn btn-ghost btn-sm" @click="handleDownload(doc)">
                            <span class="material-symbols-outlined">download</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tab Content: Confidenciales -->
    <div v-show="activeTab === 'confidential'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-error text-2xl">lock</span>
                <div>
                    <h2 class="card-title">Documentos Confidenciales</h2>
                    <p class="text-sm text-base-content/70">Acceso restringido - Solo personal autorizado</p>
                </div>
            </div>
            
            <div class="space-y-3">
                <div 
                    v-for="doc in confidentialDocuments" 
                    :key="doc.id" 
                    class="flex items-center justify-between p-4 border border-error/30 rounded-lg bg-error/5"
                >
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-4xl text-error">lock</span>
                        <div>
                            <p class="font-medium">{{ doc.name }}</p>
                            <p class="text-sm text-base-content/70">
                                {{ doc.category }} • {{ new Date(doc.uploadDate).toLocaleDateString() }}
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-outline btn-sm">
                        Solicitar Acceso
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <DocumentModal :onRefresh="refreshAll"/>
</template>

<style scoped>
.tab {
    font-size: 1rem;
}
</style>
