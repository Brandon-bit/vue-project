<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
import BaseFormCheckbox from '@/shared/components/BaseFormCheckbox.vue'
import BaseFormSingleImageInput from '@/shared/components/BaseFormSingleImageInput.vue'
import useSocialStore from '@/modules/Marketing/CordinadorRedesSociales/store/useSocialPostStore'

const socialStore = useSocialStore()
</script>

<template>
    <BaseFormInput name="date" type="date" label="Fecha de Publicación" :required="true" />
    <BaseFormInput name="caption" type="text" label="Descripción" />
    
    <BaseFormSingleImageInput 
        name="image" 
        label="Imagen" 
        accept="image/png, image/jpeg" 
        :image-url="socialStore.selectedPost?.image" 
    />

    <fieldset class="border p-4 rounded-md mt-4">
        <legend class="text-lg font-semibold px-2">Redes Sociales</legend>
        <BaseFormCheckbox class="mt-2" name="networks.facebook" label="Facebook" />
        <BaseFormCheckbox class="mt-2" name="networks.instagram" label="Instagram" />
        <BaseFormCheckbox class="mt-2" name="networks.twitter" label="Twitter" />
    </fieldset>

    <BaseFormInput name="status" type="select" label="Estado" :required="true">
        <option value="draft">Borrador</option>
        <option value="published">Publicado</option>
        <option value="archived">Archivado</option>
    </BaseFormInput>
</template>