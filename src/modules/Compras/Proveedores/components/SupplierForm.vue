<script setup lang="ts">
import BaseInput from '@/shared/components/BaseFormInput.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'

const categorias = [
    { id: 'materiales', label: 'Materiales' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'insumos', label: 'Insumos' },
    { id: 'otros', label: 'Otros' }
]
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Complete los datos del proveedor</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
                <BaseInput
                    name="nombre"
                    label="Razón Social"
                    placeholder="Nombre completo de la empresa"
                    required
                />
            </div>

            <BaseInput
                name="rfc"
                label="RFC"
                placeholder="RFC123456789"
                required
            />

            <BaseSelect
                name="categoria"
                label="Categoría"
                placeholder="Seleccionar categoría"
                :options="categorias"
                required
            />

            <BaseInput
                name="telefono"
                label="Teléfono"
                placeholder="555-1234-5678"
                required
            />

            <BaseInput
                name="email"
                label="Email"
                type="email"
                placeholder="contacto@proveedor.com"
                required
            />

            <BaseInput
                name="banco"
                label="Banco"
                placeholder="Nombre del banco"
                required
            />

            <BaseInput
                name="clabe"
                label="CLABE Interbancaria"
                placeholder="18 dígitos"
                maxlength="18"
                required
            />

            <div class="col-span-2">
                <BaseInput
                    name="direccion"
                    label="Dirección"
                    placeholder="Dirección completa (opcional)"
                />
            </div>

            <div class="col-span-2">
                <BaseInput
                    name="contactoPrincipal"
                    label="Contacto Principal"
                    placeholder="Nombre del contacto (opcional)"
                />
            </div>
        </div>

        <div class="alert">
            <span class="material-symbols-outlined">lightbulb</span>
            <div>
                <p class="font-semibold">Tip:</p>
                <p class="text-sm">Asegúrate de que el RFC y la CLABE sean correctos para evitar problemas en pagos.</p>
            </div>
        </div>
    </div>
</template>
