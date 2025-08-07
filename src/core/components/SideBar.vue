<template>
    <div class="flex text-white flex-col justify-between h-screen">
        <!-- Logo -->
        <div :class="['flex items-center justify-between mx-4', !showSidebar ? 'mb-2 mt-7' : 'my-7']">
            <router-link to="/">
                <img v-show="showSidebar && showLogo" :src="logotipo" alt="Logo" class="h-auto" />
                <img v-show="!showSidebar && showLogo" :src="isotipo" alt="Logo" class="h-auto" />
            </router-link>
        </div>

        <!-- SideBar body (Normal) -->
        <div v-if="showSidebar" class="flex-1 overflow-y-auto">
            <!-- Dashboard -->
            <router-link to="/" class="flex items-center gap-2 m-4">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <div class="oxygen-bold">Dashboard</div>
            </router-link>

            <hr class="m-4 opacity-30" />

            <!-- Modules -->
            <div v-for="m in modulos" class="text-white mb-6">
                <div v-if="m.name != ''" class="flex items-center gap-2 opacity-50 text-xs px-4">
                    <i :class="`${m.icon} text-2xl`"></i>
                    <p>{{ m.name.toUpperCase() }}</p>
                </div>

                <!-- Sections -->
                <div v-for="(s, ix) in m.sections" :tabindex="ix" class="collapse collapse-arrow">
                    <input type="checkbox" />
                    <div
                        class="collapse-title font-semibold pb-0"
                        @click="() => (s.open = !s.open)"
                    >
                        {{ s.name }}
                    </div>
                    <div
                        class="collapse-content text-sm [input:checked_~_&]:mt-2 bg-gray-200/10 mx-4 rounded p-0"
                        style="padding-bottom: 0"
                    >
                        <router-link :to="v.url" v-for="v in s.views">
                            <p class="m-2 p-1 rounded hover:bg-gray-200/50">{{ v.name }}</p>
                        </router-link>
                    </div>
                </div>

                <hr class="m-4 opacity-30" />
            </div>
        </div>

        <!-- SideBar body (Icon) -->
        <div v-else class="flex-1 overflow-y-auto">
            <!-- Dashboard -->
            <router-link to="/" class="flex justify-center items-center gap-2 m-4">
                <div role="button" class="btn hover:bg-gray-200/10 btn-ghost btn-sm p-2">
                    <i class="fas fa-fw fa-tachometer-alt text-xl text-white"></i>
                </div>
            </router-link>

            <!-- Modules -->
            <div v-for="(m, ix) in modulos" class="text-white mb-3 flex items-center justify-center">
                <div v-if="m.name != ''">
                    <button class="btn hover:bg-gray-200/10 btn-ghost btn-sm p-2" :popovertarget="`popover-${ix}`" :style="{'anchor-name': `--anchor-${ix}`}">
                        <i :class="`${m.icon} text-xl text-white`"></i>
                    </button>
                    <ul class="dropdown dropdown-right dropdown-center ml-3 menu rounded-box bg-[var(--black)] shadow-sm"
                        popover :id="`popover-${ix}`" :style="{'positionAnchor': `--anchor-${ix}`}"
                    >
                        <div v-for="(s, jx) in m.sections">
                            <button class="hover:bg-gray-200/10 rounded cursor-pointer btn-sm p-2" :popovertarget="`popover-${ix}-${jx}`" :style="{'anchor-name': `--anchor-${ix}-${jx}`}">
                                {{s.name}}
                            </button>
                            <ul class="dropdown dropdown-right dropdown-start menu rounded-box bg-[var(--gray)] shadow-sm ml-3"
                                popover :id="`popover-${ix}-${jx}`" :style="{'positionAnchor': `--anchor-${ix}-${jx}`}"
                            >
                                <li class="hover:bg-gray-200/10 rounded cursor-pointer" v-for="v in s.views">
                                    <router-link :to="v.url">
                                        <p class="p-1">{{ v.name }}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import logotipo from '@/assets/images/logotipo.png'
import isotipo from '@/assets/icons/favicon.ico'
import { ref, inject, nextTick, onMounted } from 'vue'

const modulos = inject('modulos')
const isSmallScreen = inject('isSmallScreen')
const showSidebar = inject('showSidebar')
const showLogo = inject('showLogo')
</script>
