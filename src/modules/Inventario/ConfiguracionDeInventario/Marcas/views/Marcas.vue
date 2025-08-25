<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref } from 'vue'
import { useBrand } from '../composables/useBrand'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import CreateBrandForm from '../components/createBrandForm.vue'
import useBrandStore from '../store/brand.store'
import DeleteBrandModal from '../components/deleteBrandModal.vue'

let loading = ref<boolean>(false)

const { getBrands, getBrandsTableColumns, BRAND_MODAL_IDS } = useBrand()
const modalStore = useModalStore()
const brandStore = useBrandStore()

const modalId = 'create-edit-brand-modal'

// Once the view is rendered, the data is loaded 
onMounted(async () => {
    loading.value = true
    await getBrands()
    loading.value = false
})

// This function shows the modal to create a new brand
// const showBrandModal = () => {
//     modalStore.open(modalId, { type: 'CREATE', title: 'Añadir Marca' })
// }

function openCreate() {
    brandStore.setCurrentForCreate()
    modalStore.open(BRAND_MODAL_IDS.CREATE, {
        type: 'CREATE',
        title: 'Añadir Marca'
    })
}

</script>

<template>
    <!-- MAIN VIEW -->
    <h2>Marcas</h2>
    <BaseButton text="Nueva Marca" @click="openCreate()" />
    
    <p v-if="loading">Cargando...</p>
    <BaseTable v-else :data="brandStore.brands" :headers="getBrandsTableColumns()"/>

    <!-- MODALS -->
    <CreateBrandForm />
    <DeleteBrandModal />
</template>

