<script setup lang="ts">
import useComplementStore from '@/modules/Facturacion/GeneracionDeComplementos/store/complementStore'
import type { ComplementTypeEnum } from '@/modules/Facturacion/GeneracionDeComplementos/types/complementTypes'

const complementStore = useComplementStore()

const selectType = (type: ComplementTypeEnum) => {
    complementStore.setTipoComplemento(type)
}
</script>

<template>
    <div class="space-y-4">
        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Selecciona el tipo de complemento que deseas generar</span>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <!-- Complemento de Pago -->
            <button
                @click="selectType('pago')"
                :class="[
                    'card h-32 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:shadow-lg',
                    complementStore.tipoComplemento === 'pago' 
                        ? 'bg-primary text-primary-content border-2 border-primary' 
                        : 'bg-base-100 border border-base-content/10 hover:border-primary'
                ]"
            >
                <span class="material-symbols-outlined text-4xl">payments</span>
                <div class="text-center">
                    <p class="font-semibold">Complemento de Pago</p>
                    <p class="text-xs opacity-70">REP - Recepción de Pagos</p>
                </div>
            </button>

            <!-- Carta Porte -->
            <button
                @click="selectType('cartaporte')"
                :class="[
                    'card h-32 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:shadow-lg',
                    complementStore.tipoComplemento === 'cartaporte' 
                        ? 'bg-primary text-primary-content border-2 border-primary' 
                        : 'bg-base-100 border border-base-content/10 hover:border-primary'
                ]"
            >
                <span class="material-symbols-outlined text-4xl">local_shipping</span>
                <div class="text-center">
                    <p class="font-semibold">Carta Porte</p>
                    <p class="text-xs opacity-70">Transporte de mercancías</p>
                </div>
            </button>

            <!-- Otros (Deshabilitado) -->
            <button
                disabled
                class="card h-32 flex flex-col items-center justify-center gap-3 cursor-not-allowed opacity-50 bg-base-100 border border-base-content/10"
            >
                <span class="material-symbols-outlined text-4xl">description</span>
                <div class="text-center">
                    <p class="font-semibold">Otros</p>
                    <p class="text-xs opacity-70">Próximamente</p>
                </div>
            </button>
        </div>
    </div>
</template>
