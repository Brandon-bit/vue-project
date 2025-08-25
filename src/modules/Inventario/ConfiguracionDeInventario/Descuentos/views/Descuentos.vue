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
const changeDiscountType = (option: boolean) => {
    discountOption.value = option
}

const discountValue: selectOptions[] = [
    { id: 1, label: 'Monto' },
    { id: 2, label: 'Porcentaje' }
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
</script>
<template>
    <h2 class="text-center mb-8">Crear producto</h2>
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
    <form @submit="onSubmit">
        <div v-show="!discountOption" class="grid grid-cols-12 gap-5">
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
        </div>
    </form>
</template>
<style></style>
