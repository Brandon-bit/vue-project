<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import { useForm } from 'vee-validate'
import InputSearch from '@inventario/ConfiguracionDeInventario/CrearDescuento/components/InputSearch.vue'
import BaseFormRadio from '@/shared/components/BaseFormRadio.vue'
import BaseFormSelectMultiple from '@/shared/components/BaseFormSelectMultiple.vue'
import createDiscountStore from '@inventario/ConfiguracionDeInventario/CrearDescuento/store/createDiscountStore'
import BaseActionButtonTable from '@/shared/components/BaseActionButtonTable.vue'

interface selectOptions {
    id: number
    label: string
}

const { isSubmitting, handleSubmit, values, setFieldValue } = useForm({})
const discountOption = ref(false)
const applyToOption = ref('')
const icon = ref('')
const discountUsageType = ref('')
// const selected = ref<Array<string>>([])
const discountStore = createDiscountStore()

const changeDiscountType = (option: boolean) => {
    discountOption.value = option
}

const discountValue: selectOptions[] = [
    { id: 1, label: 'Monto' },
    { id: 2, label: 'Porcentaje' }
]

const discountApplicationType: selectOptions[] = [
    { id: 1, label: 'productos' },
    { id: 2, label: 'colecciones' }
]

const onSubmit = handleSubmit(async (values) => {
    console.log(values.cliente)
})

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

watch(
    () => values.aplicarA,
    (newValue) => {
        applyToOption.value = newValue
    }
)

watch(
    () => values.usos,
    (newValue) => {
        discountUsageType.value = newValue
    }
)

const showDeleteProduct = (id: number) => {
    console.log(id)
}
</script>
<template>
    <h2 class="text-center mb-10 pb-10">Crear Descuento</h2>
    <div class="lg:max-w-[70%] lg:mx-auto">
        <div class="flex md:join gap-2 md:gap-0 flex-col md:flex-row w-full mb-10">
            <button
                class="btn w-full md:w-1/2"
                :class="discountOption ? 'btn-primary' : ''"
                @click="() => changeDiscountType(true)"
            >
                Código de descuento
            </button>
            <button
                class="btn w-full md:w-1/2"
                :class="!discountOption ? 'btn-primary' : ''"
                @click="() => changeDiscountType(false)"
            >
                Descuento automático
            </button>
        </div>
    </div>
    <div class="lg:max-w-[70%] lg:mx-auto" v-show="discountOption">descuento</div>
    <div class="lg:max-w-[70%] lg:mx-auto" v-show="!discountOption">
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
                    label="Valor del descuento"
                    :options="discountValue"
                    :required="true"
                />
                <div class="col-span-12 md:col-span-4 relative">
                    <BaseFormInput name="valueType" label="" type="number" class="mt-0 md:mt-6" />
                    <span class="material-symbols-outlined absolute top-4 md:top-10 right-2 z-10">
                        {{ icon }}
                    </span>
                </div>
                <div class="grid grid-cols-12 col-span-12 mb-1">
                    <BaseFormSelect
                        class="col-span-12 mb-1"
                        name="aplicarA"
                        label="Aplicar a"
                        :options="discountApplicationType"
                        :required="true"
                    />
                    <div class="col-span-12 relative">
                        <div class="" v-if="applyToOption == '1' || applyToOption == '2'">
                            <InputSearch />
                        </div>
                    </div>
                    <div class="col-span-12" v-if="Object.keys(discountStore.products).length">
                        <div
                            class="rounded-box border border-base-content/5 bg-base-100 my-5 w-full max-w-[100vw] overflow-hidden"
                        >
                            <div class="overflow-x-auto">
                                <table class="table text-center">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Producto</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="value in discountStore.products" :key="value.id">
                                            <td>{{ value.id }}</td>
                                            <td>{{ value.title }}</td>
                                            <td>
                                                <div class="flex gap-4 justify-center">
                                                    <BaseActionButtonTable
                                                        icon="delete"
                                                        variant="error"
                                                        tooltipText="Eliminar"
                                                        :onClick="() => showDeleteProduct(value.id)"
                                                    >
                                                    </BaseActionButtonTable>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12">
                    <BaseFormRadio
                        name="usos"
                        label="Uso de descuentos máximos"
                        :options="[
                            {
                                value: '1',
                                label: 'Limitar el número de veces que se puede usar esta descuento en total'
                            },
                            { value: '2', label: 'Limitar a un uso por cliente' }
                        ]"
                    />
                </div>
                <BaseFormInput
                    v-if="discountUsageType == '1'"
                    name="cantidad_uso"
                    label="Número máximo de usos"
                    type="number"
                    class="col-span-12"
                />
                <BaseFormSelectMultiple
                    v-if="discountUsageType == '2'"
                    class="col-span-12 mb-1"
                    name="cliente"
                    label="Elige el cliente"
                    :multiple="false"
                    :options="[
                        { id: 1, label: 'Vue' },
                        { id: 2, label: 'React' },
                        { id: 3, label: 'Angular' }
                    ]"
                    :required="true"
                />
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="fechaInicio"
                    label="Fecha de inicio"
                    type="date"
                    :required="true"
                />
                <BaseFormInput
                    class="col-span-12 md:col-span-6"
                    name="fechaFin"
                    type="date"
                    label="Fecha fin"
                    :required="true"
                />
            </div>
            <div class="grid grid-cols-12 justify-end gap-4 mt-10">
                <router-link to="/inventario/configuracion/descuentos" class="btn col-span-6">
                    <button>Regresar</button>
                </router-link>
                <button type="submit" class="btn btn-primary col-span-6" :disabled="isSubmitting">
                    <template v-if="isSubmitting">
                        <span class="loading loading-spinner"></span>
                        Procesando...
                    </template>
                    <template v-else> Aceptar </template>
                </button>
            </div>
        </form>
    </div>
</template>
<style></style>
