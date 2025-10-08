<script setup lang="ts">
import { ref } from 'vue'
import { useModalStore } from '@/shared/stores/modal.store'
import {useTransferTableHeaders} from '@/modules/Inventario/Stock/TransferenciaStock/composables/useTransferStock'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTable from '@/shared/components/BaseTable.vue'
import useTransferStore from '@/modules/Inventario/Stock/TransferenciaStock/store/transferStore'
import {useTransferActions} from '@/modules/Inventario/Stock/TransferenciaStock/composables/useTransfeActions'
import transferStockModal from '../components/transferStockModal.vue'
const { getTableColumns} = useTransferTableHeaders()
const {getTransferStock} = useTransferActions()


const transferStore= useTransferStore()
const modalStore = useModalStore()

const tablaRef = ref()


</script>

<template>
<h2 class="text-center mb-10">transfer Stock</h2>

<div class="mb-10 text-right">
        <router-link to="/traslados/crear">
        <BaseButton text="Add " icon="add" />
        </router-link>    
   
    </div>


     <BaseTable
        ref="tablaRef"
        :headers="getTableColumns()"
        :fetch-callback="getTransferStock"
    />
    <transferStockModal :onRefresh="tablaRef?.fetchData"/>
</template>