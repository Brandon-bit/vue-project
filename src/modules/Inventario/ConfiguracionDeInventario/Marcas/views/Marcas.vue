<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable.vue'
import { onMounted, ref, watch } from 'vue'
import { useBrand } from '../composables/useBrand'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseButton from '@/shared/components/BaseButton.vue'
import CreateBrandForm from '../components/createBrandForm.vue'
import useBrandStore from '../store/brand.store'

let loading = ref<boolean>(false)


const { getBrands, getBrandsTableColumns } = useBrand()
const modalStore = useModalStore()
const brandStore = useBrandStore()
//const { editingBrandId } = brandStore
const modalId = 'create-brand-modal'

onMounted(async () => {
    loading.value = true
    await getBrands()
    loading.value = false
})

const showBrandModal = () => {
    modalStore.open(modalId, { type: 'CREATE', title: 'Añadir Marca' })
}

</script>

<template>
    <h2>Marcas</h2>
    <BaseButton text="Nueva Marca" @click="showBrandModal()" />
    <p v-if="loading">Cargando...</p>
    <BaseTable v-else :data="brandStore.brands" :headers="getBrandsTableColumns()"/>
    <CreateBrandForm />
</template>

