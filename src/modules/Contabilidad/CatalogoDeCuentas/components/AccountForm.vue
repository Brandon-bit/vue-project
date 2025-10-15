<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'

const typeOptions = [
    { id: 'Grupo', label: 'Grupo' },
    { id: 'Subgrupo', label: 'Subgrupo' },
    { id: 'Cuenta', label: 'Cuenta' },
    { id: 'Subcuenta', label: 'Subcuenta' }
]

const natureOptions = [
    { id: 'Deudora', label: 'Deudora' },
    { id: 'Acreedora', label: 'Acreedora' }
]

const levelOptions = [
    { id: '1', label: 'Nivel 1 - Grupo' },
    { id: '2', label: 'Nivel 2 - Subgrupo' },
    { id: '3', label: 'Nivel 3 - Cuenta' },
    { id: '4', label: 'Nivel 4 - Subcuenta' }
]

const currencyOptions = [
    { id: 'MXN', label: 'MXN - Peso Mexicano' },
    { id: 'USD', label: 'USD - Dólar' },
    { id: 'EUR', label: 'EUR - Euro' }
]
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseFormInput 
            name="code" 
            type="text" 
            label="Código" 
            placeholder="1000"
            :required="true" 
        />
        <BaseFormInput 
            name="name" 
            type="text" 
            label="Nombre" 
            placeholder="Nombre de la cuenta"
            :required="true" 
        />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseFormSelect 
            name="type" 
            label="Tipo" 
            :options="typeOptions"
            :required="true"
        />
        <BaseFormSelect 
            name="nature" 
            label="Naturaleza" 
            :options="natureOptions"
            :required="true"
        />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseFormSelect 
            name="level" 
            label="Nivel" 
            :options="levelOptions"
            :required="true"
        />
        <BaseFormSelect 
            name="currency" 
            label="Moneda" 
            :options="currencyOptions"
            :required="true"
        />
    </div>

    <div class="space-y-4 pt-4 border-t">
        <div class="flex flex-col space-y-2">
            <label class="font-semibold">¿Acepta movimientos?</label>
            <p class="text-sm text-gray-500">Permite registrar transacciones directas</p>
            <BaseFormCheckbox 
                name="acceptsMovements" 
                label="" 
            />
        </div>

        <div class="flex flex-col space-y-2">
            <label class="font-semibold">¿Requiere auxiliar?</label>
            <p class="text-sm text-gray-500">Necesita un desglose adicional</p>
            <BaseFormCheckbox 
                name="requiresAuxiliary" 
                label="" 
            />
        </div>

        <div class="flex flex-col space-y-2">
            <label class="font-semibold">¿Cuenta activa?</label>
            <p class="text-sm text-gray-500">Disponible para operaciones</p>
            <BaseFormCheckbox 
                name="active" 
                label="" 
            />
        </div>
    </div>
</template>
