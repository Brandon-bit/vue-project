<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import { useCommunications } from '@/modules/RRHH/ComunicacionesOrganizacionales/composables/useCommunications'
import { useCommunicationActions } from '@/modules/RRHH/ComunicacionesOrganizacionales/composables/useCommunicationActions'
import CommunicationModal from '@/modules/RRHH/ComunicacionesOrganizacionales/components/CommunicationModal.vue'
import CommunicationStatsCards from '@/modules/RRHH/ComunicacionesOrganizacionales/components/CommunicationStatsCards.vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'

const router = useRouter()
const { getTableColumns, MODAL_ID } = useCommunications()
const { getCommunications } = useCommunicationActions()

const tablaRef = ref()

const handleNewCommunication = () => {
    router.push('/rrhh/comunicaciones-organizacionales/crear')
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Comunicaciones organizacionales" 
            subtitle="Gestión de comunicaciones organizacionales"
        />
        <div class="mb-10 flex gap-4 justify-end">
            <BaseButton
                text="Nuevo Comunicado"
                icon="add"
                @click="handleNewCommunication"
            />
        </div>

        <!-- Stats Cards -->
        <CommunicationStatsCards />

        <!-- Table -->
        <BaseTable
            ref="tablaRef"
            :headers="getTableColumns()"
            :fetch-callback="getCommunications"
        />

        <CommunicationModal :modal-id="MODAL_ID" :on-refresh="tablaRef?.fetchData" />
    </div>
</template>
