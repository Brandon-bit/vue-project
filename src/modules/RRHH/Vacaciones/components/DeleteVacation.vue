<script setup lang="ts">
import useVacationStore from '@rrhh/Vacaciones/store/vacationStore'
import { formatDate } from '@rrhh/Vacaciones/composables/mappingVacations'

const vacationStore = useVacationStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la solicitud de vacaciones de
        <span class="!font-semibold">
            "{{ vacationStore.selectedVacation?.employeeName }}"
        </span>
        del
        <span class="!font-semibold">
            {{ formatDate(vacationStore.selectedVacation?.startDate || '') }}
        </span>
        al
        <span class="!font-semibold">
            {{ formatDate(vacationStore.selectedVacation?.endDate || '') }}
        </span>
        ?
    </p>
</template>
