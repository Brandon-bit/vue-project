<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseTextArea from '@/shared/components/BaseTextArea.vue'
</script>

<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12">
            <BaseFormInput
                name="name"
                type="text"
                label="Nombre del departamento"
                placeholder="Ej: Recursos Humanos"
                :required="true"
            />
        </div>
        <div class="col-span-12">
            <BaseTextArea
                name="description"
                label="Descripción"
            />
        </div>
        <div class="col-span-12">
            <BaseFormCheckbox name="active" label="Estado" :default="true" />
        </div>
    </div>
</template>
