<script setup>
    import { inject } from 'vue'
    import logotipo from '@/assets/images/logotipo.png'
    import { ref } from 'vue'

    const showSidebar = inject('showSidebar')
    const modulos = inject('modulos')
</script>

<template>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" v-model="showSidebar"/>
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="menu bg-[var(--black)] text-white justify-between min-h-full w-70 max-w-[80vw]">
                <!-- Logo -->
                <div class="flex items-center justify-between mx-4 my-7">
                    <router-link to="/">
                    <img :src="logotipo" alt="Logo" class="h-auto" />
                    </router-link>
                </div>

                <!-- SideBar body -->
                <div class="flex-1 overflow-y-auto">
                    <!-- Dashboard -->
                    <router-link to="/" class="flex items-center gap-2 m-4">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <div class="oxygen-bold">Dashboard</div>
                    </router-link>

                    <hr class="m-4 opacity-30"/>

                    <!-- Modules -->
                    <div v-for="m in modulos" class="text-white mb-6">
                    <div v-if="m.name != ''" class="flex items-center gap-2 opacity-50 text-xs px-4">
                        <i :class="`${m.icon} text-2xl`"></i>
                        <p>{{ m.name.toUpperCase() }}</p>
                    </div>
                    
                    <!-- Sections -->
                    <div v-for="(s, ix) in m.sections" :tabindex="ix" class="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div class="collapse-title font-semibold pb-0" @click="() => s.open = !s.open">{{ s.name }}</div>
                        <div class="collapse-content text-sm [input:checked_~_&]:mt-2 bg-gray-200/10 mx-4 rounded p-0" style="padding-bottom: 0;">
                        <router-link :to="v.url" v-for="v in s.views">
                            <p class="m-2 p-1 rounded hover:bg-gray-200/50">{{ v.name }}</p>
                        </router-link>
                        </div>
                    </div>

                    <hr class="m-4 opacity-30"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>