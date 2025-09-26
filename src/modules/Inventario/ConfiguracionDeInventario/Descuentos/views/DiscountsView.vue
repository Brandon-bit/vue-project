<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useForm } from 'vee-validate'

interface selectOptions {
    id: number
    label: string
}

const { isSubmitting, handleSubmit, values, setFieldValue } = useForm({})
const discountOption = ref(false)
const icon = ref('')
// const query = ref('')
// const results = ref([])
// const loading = ref(false)
// let timeout: number | null = null
const results = ref([])
const loading = ref(false)
const noResults = ref(false)
const currentPage = ref(1)
const query = ref('')
const timeout = ref<NodeJS.Timeout | null>(null)

const changeDiscountType = (option: boolean) => {
    discountOption.value = option
}

const discountValue: selectOptions[] = [
    { id: 1, label: 'Monto' },
    { id: 2, label: 'Porcentaje' }
]

const discountApplicationType: selectOptions[] = [
    { id: 1, label: 'productos' },
    { id: 2, label: 'categorías' }
]

const onSubmit = handleSubmit(async (values) => {})

watch(
    () => values.discountType,
    (newValue) => {
        if (newValue == 1) {
            icon.value = 'attach_money'
        } else if (newValue == 2) {
            icon.value = 'percent'
        } else {
            icon.value = ''
        }
    }
)

// -----------------------------------------------

// Función para realizar la búsqueda
const searchProducts = async (query: string, page: number) => {
    if (!query) {
        results.value = []
        return
    }

    loading.value = true

    try {
        // Hacemos el fetch al backend (aquí puedes poner tu API real)
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20&q=${query}`
        )
        const data = await response.json()
        console.log(data)
        if (data.length === 0) {
            noResults.value = true
        } else {
            results.value = [...results.value, ...data] // Añadir nuevos resultados a los existentes
        }
    } catch (error) {
        console.error('Error al buscar productos:', error)
    } finally {
        loading.value = false
    }
}

const onScroll = async (event: Event) => {
    const scrollable = event.target as HTMLElement
    const bottom = scrollable.scrollHeight === scrollable.scrollTop + scrollable.clientHeight

    if (bottom && !loading.value) {
        currentPage.value++
        searchProducts(query.value, currentPage.value)
    }
}

// Usamos un watcher para hacer el debounce en la búsqueda
watch(query, (newQuery) => {
    if (timeout.value) clearTimeout(timeout.value)

    timeout.value = setTimeout(() => {
        currentPage.value = 1 // Reiniciar la página
        results.value = [] // Limpiar resultados
        noResults.value = false // Resetear estado de no resultados
        searchProducts(newQuery, currentPage.value)
    }, 300) // 300ms de espera para evitar hacer peticiones innecesarias
})
</script>
<template>
    <h2 class="text-center mb-8">Crear Descuento</h2>
    <div class="join mb-10">
        <button
            :class="['btn join-item', discountOption ? 'btn-primary' : '']"
            @click="() => changeDiscountType(true)"
        >
            Código de descuento
        </button>
        <button
            :class="['btn join-item', !discountOption ? 'btn-primary' : '']"
            @click="() => changeDiscountType(false)"
        >
            Descuento automático
        </button>
    </div>
    <div v-show="discountOption">descuento</div>
    <div v-show="!discountOption" class="p-2">
        <form @submit="onSubmit">
            <div class="grid grid-cols-12 gap-5">
                <BaseFormInput
                    class="col-span-12"
                    name="name"
                    label="Nombre de descuento"
                    :required="true"
                />
                <BaseFormSelect
                    class="col-span-12 md:col-span-8"
                    name="discountType"
                    label="Tipo de descuento"
                    :options="discountValue"
                    :required="true"
                />
                <div class="col-span-12 md:col-span-4 relative">
                    <BaseFormInput name="valueType" label="Valor tipo de descuento" />
                    <span class="material-symbols-outlined absolute top-10 right-2 z-10">
                        {{ icon }}
                    </span>
                </div>
                <BaseFormSelect
                    class="col-span-12 md:col-span-6"
                    name="discountType"
                    label="Aplicar a"
                    :options="discountApplicationType"
                    :required="true"
                />
                <div class="col-span-12 md:col-span-6">
                    <input
                        class="input mt-8 w-full"
                        v-model="query"
                        placeholder="Buscar productos..."
                    />
                    <ul
                        v-if="results.length"
                        @scroll="onScroll"
                        class="max-w-3xl mx-auto overflow-y-auto z-10 max-h-80 rounded-bl-lg rounded-br-lg border-b-1 border-s-1 border-e-1 border-gray-300 p-2"
                    >
                        <li
                            v-for="product in results"
                            :key="product.id"
                            class="p-1 hover:bg-gray-100"
                        >
                            {{ product.title }}
                        </li>
                    </ul>
                    <div v-show="loading" class="text-center py-2 text-gray-600">
                        Cargando mas resultados...
                    </div>
                    <div v-show="noResults" class="text-center py-2 text-gray-600">
                        No se encontraron más resultados.
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style></style>
