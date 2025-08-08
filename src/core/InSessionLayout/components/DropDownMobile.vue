<template>
    <div class="dropdown dropdown-end 2xl:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost flex items-center">
            <span class="material-symbols-outlined" style="font-size: 35px;">
                menu
            </span>
        </div>
        <div tabindex="0" class="dropdown-content bg-base-200 rounded-box w-80 p-3 shadow-sm">
            <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                    language
                </span>
                <p>Navegación</p>
            </div>

            <hr class="opacity-20 mt-1" />

            <ul class="menu w-auto">
                <li>
                    <router-link to="/exportar" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            file_export
                        </span>
                        <p>Exportar</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pendientes" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            lists
                        </span>
                        <p>Lista de pendientes</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/indicadores" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            speed
                        </span>
                        <p>Indicadores</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/portafolio-de-proyectos" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            manage_search
                        </span>
                        <p>Portafolio de proyectos</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/roadmap" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            map_search  
                        </span>
                        <p>Roadmap</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/agenda" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            calendar_month
                        </span>
                        <p>Agenda</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/tutoriales" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            school
                        </span>
                        <p>Tutoriales</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/soporte" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            live_help
                        </span>
                        <p>Soporte</p>
                    </router-link>
                </li>
            </ul>

            <div class="flex items-center gap-1">
                <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                    mail
                </span>
                <p>brandon.juarez@proyectopolis.com</p>
            </div>

            <hr class="opacity-20 mt-1" />

            <ul class="menu w-auto">
                <li>
                    <router-link to="/perfil" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            person
                        </span>
                        <p>Perfil</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/escala-tu-negocio" class="flex px-1">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            signpost
                        </span>
                        <p>Escala tu negocio</p>
                    </router-link>
                </li>
                <li>
                    <button class="flex px-1" @click="logOut()">
                        <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">
                            logout
                        </span>
                        <p>Cerrar sesión</p>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        logOut: () => void
    }>()
</script>