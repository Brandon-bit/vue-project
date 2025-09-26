<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useControlPanelActions } from '@inventario/Operacion/Tablero/composables/useControlPanelActions'
import { ControlPanelResponseDataType } from '@inventario/Operacion/Tablero/types/controlPanelTypes'
import PrincipalCard from '@inventario/Operacion/Tablero/components/PrincipalCard.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
const { getControlPanelData } = useControlPanelActions()

const data = ref<ControlPanelResponseDataType[]>([])
onMounted(async () => {
    const response = await getControlPanelData()
    data.value = response.items
})
</script>
<template>
    <h2 class="text-center mb-10">Gestión de inventarios</h2>
    <div class="p-2">
        <div class="principal-cards-container grid grid-cols-12 gap-4 md:gap-6 mb-10">
            <PrincipalCard v-for="value in data" :title="value.title" :quantity="value.quantity" />
        </div>
        <div class="secondary-cards-container grid grid-cols-12 gap-4 md:gap-6">
            <div class="card bg-base-100 shadow-sm col-span-12 md:col-span-6">
                <div class="card-body">
                    <div class="grid grid-rows-2 items-center h-full">
                        <h3 class="card-title row-span-1 !font-semibold mb-5">Operación diaria</h3>
                        <div class="row-span-1 flex gap-4 flex-wrap">
                            <router-link to="/inventario/operacion/entradas">
                                <BaseButton
                                    class-name="btn-soft"
                                    variant="info"
                                    text="Registrar entrada"
                                    icon="arrow_circle_down"
                                />
                            </router-link>
                            <router-link to="/inventario/operacion/salidas">
                                <BaseButton
                                    class-name="btn-soft"
                                    variant="info"
                                    text="Registrar salida"
                                    icon="arrow_circle_up"
                                />
                            </router-link>
                            <router-link to="/inventario/operacion/autorizaciones-de-pedidos">
                                <BaseButton
                                    class-name="btn-soft"
                                    variant="info"
                                    text="Pedidos"
                                    icon="list_alt"
                                />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 shadow-sm col-span-12 md:col-span-6">
                <div class="card-body">
                    <div class="grid grid-rows-2 items-center h-full">
                        <h3 class="card-title row-span-1 !font-semibold mb-5">
                            Control y gobierno
                        </h3>
                        <div class="row-span-1 flex gap-4 flex-wrap">
                            <router-link to="/inventario/operacion/puntos-maximos-minimos">
                                <BaseButton
                                    class-name="btn-info"
                                    variant="soft"
                                    text="Puntos max/min"
                                    icon="layers"
                                />
                            </router-link>
                            <router-link to="/inventario/operacion/autorizaciones">
                                <BaseButton
                                    class-name="btn-info"
                                    variant="soft"
                                    text="Autorizaciones"
                                    icon="check_circle"
                                />
                            </router-link>
                            <router-link to="/inventario/operacion/polizas">
                                <BaseButton
                                    class-name="btn-info"
                                    variant="soft"
                                    text="Pólizas"
                                    icon="shield"
                                />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
