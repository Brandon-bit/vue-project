<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from '@/shared/components/BaseFormInput.vue'
import BaseSelect from '@/shared/components/BaseFormSelect.vue'
import useCFDIStore from '@/modules/Facturacion/GeneracionDeCFDI/store/cfdiStore'
import { useCFDIActions } from '@/modules/Facturacion/GeneracionDeCFDI/composables/useCFDIActions'

const cfdiStore = useCFDIStore()
const { getUsosCFDI, getMetodosPago, getFormasPago } = useCFDIActions()

const regimenesFiscales = [
    { id: '601', label: '601 - General de Ley Personas Morales' },
    { id: '603', label: '603 - Personas Morales con Fines no Lucrativos' },
    { id: '605', label: '605 - Sueldos y Salarios' },
    { id: '606', label: '606 - Arrendamiento' },
    { id: '612', label: '612 - Personas Físicas con Actividades Empresariales' },
    { id: '616', label: '616 - Sin obligaciones fiscales' },
    { id: '621', label: '621 - Incorporación Fiscal' }
]

const usosCFDI = getUsosCFDI()
const metodosPago = getMetodosPago()
const formasPago = getFormasPago()

const monedas = [
    { id: 'MXN', label: 'MXN - Peso Mexicano' },
    { id: 'USD', label: 'USD - Dólar Americano' },
    { id: 'EUR', label: 'EUR - Euro' }
]

const emisor = computed(() => cfdiStore.formData.emisor)
</script>

<template>
    <div class="space-y-4">
        <!-- Emisor (Pre-cargado) -->
        <div class="card bg-base-200 border-2 border-primary/20">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">business</span>
                    Emisor
                </h4>
                <p class="text-sm text-gray-600 mb-3">Datos precargados desde la configuración de la empresa</p>
                
                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="emisorRfc"
                        label="RFC"
                        :value="emisor.rfc"
                        disabled
                    />
                    <BaseInput
                        name="emisorRazonSocial"
                        label="Razón Social"
                        :value="emisor.razonSocial"
                        disabled
                    />
                    <BaseInput
                        name="emisorRegimenFiscal"
                        label="Régimen Fiscal"
                        :value="`${emisor.regimenFiscal} - General de Ley Personas Morales`"
                        disabled
                    />
                    <BaseInput
                        name="emisorCodigoPostal"
                        label="Código Postal"
                        :value="emisor.codigoPostal"
                        disabled
                    />
                </div>
            </div>
        </div>

        <!-- Receptor -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">person</span>
                    Receptor
                </h4>
                <p class="text-sm text-gray-600 mb-3">Busca o da de alta un nuevo cliente</p>

                <!-- Buscador de Cliente -->
                <div class="flex gap-2 mb-4">
                    <div class="flex-1">
                        <label class="label">
                            <span class="label-text">Buscar Cliente</span>
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
                            Nuevo Cliente
                        </button>
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Datos del Receptor -->
                <div class="grid grid-cols-2 gap-4">
                    <BaseInput
                        name="receptorRfc"
                        label="RFC"
                        placeholder="XAXX010101000"
                        required
                    />
                    <BaseInput
                        name="receptorRazonSocial"
                        label="Razón Social"
                        placeholder="Nombre o Razón Social"
                        required
                    />
                    <BaseSelect
                        name="receptorRegimenFiscal"
                        label="Régimen Fiscal"
                        placeholder="Selecciona..."
                        :options="regimenesFiscales"
                        required
                    />
                    <BaseInput
                        name="receptorCodigoPostal"
                        label="Código Postal"
                        placeholder="00000"
                        maxlength="5"
                        required
                    />
                    <BaseSelect
                        name="receptorUsoCFDI"
                        label="Uso de CFDI"
                        placeholder="Selecciona..."
                        :options="usosCFDI"
                        required
                    />
                </div>
            </div>
        </div>

        <!-- Datos del Comprobante -->
        <div class="card bg-base-100 border border-base-content/10">
            <div class="card-body">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined">receipt_long</span>
                    Datos del Comprobante
                </h4>

                <div class="grid grid-cols-3 gap-4">
                    <BaseSelect
                        name="metodoPago"
                        label="Método de Pago"
                        placeholder="Selecciona..."
                        :options="metodosPago"
                        required
                    />
                    <BaseSelect
                        name="formaPago"
                        label="Forma de Pago"
                        placeholder="Selecciona..."
                        :options="formasPago"
                        required
                    />
                    <BaseSelect
                        name="moneda"
                        label="Moneda"
                        :options="monedas"
                        required
                    />
                </div>
            </div>
        </div>

        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Completa los datos del receptor y del comprobante antes de continuar</span>
        </div>
    </div>
</template>
