<script setup lang="ts">
import { useForm } from 'vee-validate';
import BaseFormInput from '@/shared/components/BaseFormInput.vue';
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue';
import BaseTextArea from '@/shared/components/BaseTextArea.vue';
import schema from '../validations/UserValidation';
import BaseTable from '@/shared/components/BaseTable.vue'
import {data, headers} from '../data/data.ts'
import BaseModal from '@/shared/components/BaseModal.vue';
import { useModalStore } from '@sharedstore/modal.store'

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
//   alert(JSON.stringify(values, null, 2));
 try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (response.ok) {
      const data = await response.json();
       modalStore.close(modalId)
      console.log('Respuesta recibida:', data);
    } else {
      console.log(`Error: (${response.status})`);
       modalStore.close(modalId)
    }
  } catch (error) {
    console.log('Error en la petición:', error);
  }
});

const modalStore = useModalStore()
const modalId = 'create-user'
function openModal() {
    resetForm()
    modalStore.open(modalId)
}

const options = [
    {id: 0, label: 'Inactivo'},
    {id: 1, label: 'Activo'}
]

</script>

<template>
  <h2 class="text-center mb-8">Usuarios</h2>
  <div class="mb-10 text-right">
    <button class="btn btn-primary" @click="openModal">Crear usuario</button>
  </div>
    <BaseTable :data="data" :headers="headers"></BaseTable>
    <BaseModal
        :onSubmit="onSubmit"
        modalTitle="Crear usuario"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
        >
      <template v-slot:modalBody>
            <BaseFormInput
                label="Nombre"
                name="name"
                type="text"
            />
            <BaseFormInput
                label="Nombre"
                name="name"
                type="text"
            />
            <BaseFormInput
                label="Nombre"
                name="name"
                type="text"
            />
            <BaseFormInput
                label="Email"
                name="email"
                type="email"
            />
            <BaseFormInput
                label="Apellido"
                name="lastname"
                type="text"
            />
            <BaseTextArea
                label="Descripción"
                name="description"
            />
            <BaseFormSelect
                label="Estado"
                name="status"
                :options="options"
            />
      </template>
    </BaseModal>
</template>
