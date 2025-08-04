<script setup>
    import { inject } from 'vue'
    import DropDownMobile from './DropDownMobile.vue';

    const showSidebar = inject('showSidebar')

    function toggleSidebar() {
        showSidebar.value = !showSidebar.value
    }
</script>

<template>
    <div class="navbar bg-base-100 shadow-sm rounded">
        <div class="navbar-start" style="width: 100%;">
            <button class="btn btn-sm btn-outline ml-4" @click="toggleSidebar"><i class="fas fa-arrow-left transition-transform duration-300" :class="{ 'rotate-180': !showSidebar }"></i></button>

            <div class="divider divider-horizontal hidden 2xl:flex"></div>

            <ul class="menu menu-horizontal px-1 hidden 2xl:flex">
                <li>
                    <router-link to="/exportar" class="flex flex-col">
                        <i class="fas fa-file-export text-xl"></i>
                        <p class="text-sm">EXPORTAR</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pendientes" class="flex flex-col">
                        <i class="fas fa-tasks text-xl"></i>
                        <p class="text-sm">LISTA DE PENDIENTES</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/indicadores" class="flex flex-col">
                        <i class="fas fa-tachometer-alt text-xl"></i>
                        <p class="text-sm">INDICADORES</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/portafolio-de-proyectos" class="flex flex-col">
                        <i class="fas fa-search text-xl"></i>
                        <p class="text-sm">PORTAFOLIO DE PROYECTOS</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/roadmap" class="flex flex-col">
                        <i class="fas fa-map-marked-alt text-xl"></i>
                        <p class="text-sm">ROADMAP</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/agenda" class="flex flex-col">
                        <i class="fas fa-calendar-alt text-xl"></i>
                        <p class="text-sm">AGENDA</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/tutoriales" class="flex flex-col">
                        <i class="fas fa-graduation-cap text-xl"></i>
                        <p class="text-sm">TUTORIALES</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="navbar-end" style="width: 25%;">
            <ul class="menu menu-horizontal px-1 hidden 2xl:flex">
                <li>
                    <router-link to="/soporte" class="flex flex-col">
                        <i class="fas fa-question text-xl"></i>
                        <p class="text-sm">SOPORTE</p>
                    </router-link>
                </li>
            </ul>

            <div class="divider divider-horizontal hidden 2xl:flex"></div>

            <div class="dropdown dropdown-end hidden 2xl:block">
                <div tabindex="0" role="button" class="btn btn-ghost flex items-center">
                    <p>Brandon Juarez</p>
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div tabindex="0" class="dropdown-content bg-base-200 rounded-box w-80 p-3 shadow-sm">
                    <div class="flex items-center justify-center">
                        <i class="fas fa-envelope fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>brandon.juarez@proyectopolis.com</p>
                    </div>

                    <hr class="opacity-20 mt-1"/>

                    <ul class="menu w-auto">
                        <li>
                            <router-link to="/perfil" class="flex px-1">
                                <i class="fas fa-user-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                                <p>Perfil</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/escala-tu-negocio" class="flex px-1">
                                <i class="fas fa-sign fa-sm fa-fw mr-2 text-gray-400"></i>
                                <p>Escala tu negocio</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#" class="flex px-1">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                <p>Cerrar sesión</p>
                            </router-link>
                        </li>
                    </ul>
                    
                </div>
            </div>

            <DropDownMobile />
        </div>
    </div>
</template>