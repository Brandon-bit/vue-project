<script setup lang="ts">
import BaseFormInput from '@/shared/components/BaseFormInput.vue'
</script>

<template>
  <div class=" space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseFormInput name="name" label="Cliente"   :required="true" />
      <BaseFormInput name="reference"  label="Referencia" :required="true" />
      <BaseFormInput name="sale_date" type="date" label="Fecha" :required="true" />

    </div>
    
    <div>
       <BaseFormCheckbox class="mt-4" name="payment_status" label="Estado" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseFormInput name="biller_name"  label="nombre facturador" />
      <BaseFormInput name="paid"  label="pagado" />
      <BaseFormInput name="due"  label="Debido" />
      <BaseFormInput name="grand_total"  label="Total General" />
    </div>
  </div>
</template>
