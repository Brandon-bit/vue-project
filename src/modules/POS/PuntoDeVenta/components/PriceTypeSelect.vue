<script setup lang="ts">
import { ref } from 'vue'
import usePosStore from '@pos/PuntoDeVenta/store/posStore'

const posStore = usePosStore()
const clientTypeValue = ref(1)
const optionsMap = [
    { id: 1, label: 'Mostrador' },
    { id: 2, label: 'Ferretero' },
    { id: 3, label: 'Otro' }
]

const setPriceType = () => {
    posStore.setPriceType(clientTypeValue.value)
}
</script>
<template>
    <select
        @change="setPriceType"
        v-model="clientTypeValue"
        class="select w-full"
        name="clientType"
    >
        <option v-for="(option, index) in optionsMap" :key="index" :value="option.id.toString()">
            {{ option.label }}
        </option>
    </select>
</template>
