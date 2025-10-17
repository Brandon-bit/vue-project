<script setup lang="ts">
import BaseInput from '@/shared/components/BaseFormInput.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'

const regimenesFiscales = [
    { id: '612', label: '612 - Personas Físicas con Actividades Empresariales' },
    { id: '605', label: '605 - Sueldos y Salarios' },
    { id: '606', label: '606 - Arrendamiento' },
    { id: '621', label: '621 - Incorporación Fiscal' },
    { id: '601', label: '601 - General de Ley Personas Morales' }
]

const meses = [
    { id: '01', label: 'Enero' },
    { id: '02', label: 'Febrero' },
    { id: '03', label: 'Marzo' },
    { id: '04', label: 'Abril' },
    { id: '05', label: 'Mayo' },
    { id: '06', label: 'Junio' },
    { id: '07', label: 'Julio' },
    { id: '08', label: 'Agosto' },
    { id: '09', label: 'Septiembre' },
    { id: '10', label: 'Octubre' },
    { id: '11', label: 'Noviembre' },
    { id: '12', label: 'Diciembre' }
]

const anios = [
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' }
]
</script>

<template>
    <div class="space-y-4">
        <!-- Receptor de la Constancia -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">person</span>
                    Receptor de la Constancia
                </h4>
                <p class="text-sm text-gray-600 mb-3">Busca o da de alta el proveedor/receptor</p>

                <!-- Buscador de Proveedor -->
                <div class="flex gap-2 mb-4">
                    <div class="flex-1">
                        <label class="label">
                            <span class="label-text">Buscar Proveedor</span>
                        </label>
                        <div class="flex gap-2">
                            <input
                                type="text"
                                placeholder="RFC o Razón Social"
                                class="input input-bordered w-full"
                            />
                            <button class="btn btn-square btn-outline">
                                <span class="material-symbols-outlined">search</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-end">
                        <button class="btn btn-outline">
                            <span class="material-symbols-outlined">add</span>
                            Nuevo Proveedor
                        </button>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Datos del Receptor -->
                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="rfc"
                        label="RFC"
                        placeholder="XAXX010101000"
                        required
                    />
                    <BaseInput
                        name="razonSocial"
                        label="Razón Social"
                        placeholder="Nombre o Razón Social"
                        required
                    />
                    <BaseSelect
                        name="regimenFiscal"
                        label="Régimen Fiscal"
                        placeholder="Selecciona..."
                        :options="regimenesFiscales"
                        required
                    />
                    <BaseInput
                        name="codigoPostal"
                        label="Código Postal"
                        placeholder="00000"
                        maxlength="5"
                        required
                    />
                </div>
            </div>
        </div>

        <!-- Periodo de la Constancia -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">calendar_month</span>
                    Periodo de la Constancia
                </h4>
                <p class="text-sm text-gray-600 mb-3">Define el periodo que cubre la constancia</p>

                <div class="grid grid-cols-2 gap-4">
                    <BaseSelect
                        name="mes"
                        label="Mes"
                        placeholder="Selecciona..."
                        :options="meses"
                        required
                    />
                    <BaseSelect
                        name="anio"
                        label="Año"
                        :options="anios"
                        required
                    />
                </div>
            </div>
        </div>

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Completa los datos del receptor y el periodo antes de continuar</span>
        </div>
    </div>
</template>
