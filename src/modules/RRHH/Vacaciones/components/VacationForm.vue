<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useField } from 'vee-validate'
import { useModalStore } from '@/shared/stores/modal.store'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
import useVacationStore from '@rrhh/Vacaciones/store/vacationStore'
import { useVacationsActions } from '@rrhh/Vacaciones/composables/useVacationsActions'

const modalStore = useModalStore()
const vacationStore = useVacationStore()
const { getEmployeesBySearch } = useVacationsActions()

const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const currentPage = ref(1)
const results = ref<any[]>([])
const loading = ref(false)
const currentQuery = ref<string>('')
const suppressSearch = ref(false)
const noResults = ref(false)

const { value: employeeValue } = useField<string>('employeeName')
const { value: employeeIdValue } = useField<number | null>('employeeId')

const mode = computed(() => modalStore.modals[vacationStore.modalId]?.type)
const isEditing = computed(() => mode.value === 'UPDATE')
const isPending = computed(() => vacationStore.selectedVacation?.status === 'pending')

const statusOptions = [
    { id: 'pending', label: 'Pendiente' },
    { id: 'approved', label: 'Aprobada' },
    { id: 'rejected', label: 'Rechazada' }
]

const searchEmployees = async (page: number, limit: number = 10) => {
    if (!currentQuery.value) {
        results.value = []
        noResults.value = false
        return
    }

    loading.value = true
    noResults.value = false

    const result = await getEmployeesBySearch(currentQuery.value, limit, page)
    const employees = result.employees

    if (page === 1) {
        results.value = employees
    } else {
        results.value = [...results.value, ...employees]
    }

    if (results.value.length === 0) {
        noResults.value = true
        employeeIdValue.value = null
    }

    loading.value = false
}

watch(employeeValue, (query) => {
    if (timeout.value) clearTimeout(timeout.value)
    if (suppressSearch.value) {
        suppressSearch.value = false
        return
    }

    if (isEditing.value && !isPending.value) return

    currentQuery.value = query
    timeout.value = setTimeout(async () => {
        currentPage.value = 1
        results.value = []
        noResults.value = false

        if (employeeIdValue.value) {
            employeeIdValue.value = null
        }

        if (query.trim()) {
            await searchEmployees(currentPage.value)
        } else {
            results.value = []
            noResults.value = false
            employeeIdValue.value = null
        }
    }, 300)
})

const selectEmployee = (id: number, name: string) => {
    if (id) {
        suppressSearch.value = true
        employeeIdValue.value = id
        employeeValue.value = name
        currentPage.value = 1
        results.value = []
        noResults.value = false
    }
}

const onScroll = async (event: Event) => {
    const target = event.target as HTMLElement
    const bottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 5
    if (bottom && !loading.value && currentQuery.value) {
        currentPage.value++
        await searchEmployees(currentPage.value)
    }
}

// Get today's date in YYYY-MM-DD format for min attribute
const today = new Date().toISOString().split('T')[0]
</script>

<template>
    <div class="relative col-span-12">
        <BaseFormInput
            name="employeeName"
            type="text"
            label="Empleado"
            inputClass="ps-10"
            :required="true"
            :readonly="isEditing && !isPending"
        />
        <span class="material-symbols-outlined absolute top-10 text-gray-500 left-2 z-10">
            search
        </span>
        <ul
            v-if="results.length"
            @scroll="onScroll"
            class="mx-auto overflow-y-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-2 pb-2 pt-4"
        >
            <li
                v-for="employee in results"
                :key="employee.id"
                @click="selectEmployee(employee.id, employee.title)"
                class="p-1 hover:bg-gray-100 cursor-pointer"
            >
                {{ employee.title }}
            </li>
        </ul>
        <div
            v-else-if="noResults && !loading"
            class="mx-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 px-4 py-2 text-gray-500"
        >
            No hay coincidencias
        </div>
    </div>

    <div class="grid grid-cols-12 gap-3">
        <BaseFormInput
            name="startDate"
            type="date"
            label="Fecha de inicio"
            :required="true"
            class="col-span-6"
            :readonly="isEditing && !isPending"
            :min="today"
        />
        <BaseFormInput
            name="endDate"
            type="date"
            label="Fecha de fin"
            :required="true"
            class="col-span-6"
            :readonly="isEditing && !isPending"
            :min="today"
        />
    </div>

    <BaseFormSelect
        v-if="isEditing"
        name="status"
        label="Estado"
        :options="statusOptions"
        :required="true"
    />

    <BaseTextArea name="comments" label="Comentarios (opcional)" :readonly="isEditing && !isPending" />
</template>
