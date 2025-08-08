<script setup>
    import { inject } from 'vue'
    import DropDownMobile from './DropDownMobile.vue'
    import { useAuthStore } from '@/store/auth.ts'
    import { useRouter } from 'vue-router'

    const authStore = useAuthStore();

    const showSidebar = inject('showSidebar')
    const showLogo = inject('showLogo')

    const router = useRouter()
    const user = authStore.user

    console.log(user)

    function toggleSidebar() {
        showSidebar.value = !showSidebar.value
        showLogo.value = false
        setTimeout(() => {
            showLogo.value = true
        }, 300)
    }

    const logOut = () => {
        authStore.logout()
        router.push('/login')
    }
</script>

<template>
    <div class="navbar bg-base-100 shadow-sm rounded">
        <div class="navbar-start" style="width: 100%">
            <button class="btn btn-sm btn-outline ml-4 p-1" @click="toggleSidebar">
                <span class="material-symbols-outlined">
                    {{ showSidebar ? 'arrow_left_alt' : 'arrow_right_alt' }}
                </span>
            </button>

            <div class="divider divider-horizontal hidden 2xl:flex"></div>

            <ul class="menu menu-horizontal px-1 hidden 2xl:flex">
                <li>
                    <router-link to="/exportar" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            file_export
                        </span>
                        <p class="text-sm">EXPORTAR</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pendientes" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            lists
                        </span>
                        <p class="text-sm">LISTA DE PENDIENTES</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/indicadores" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            speed
                        </span>
                        <p class="text-sm">INDICADORES</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/portafolio-de-proyectos" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            manage_search
                        </span>
                        <p class="text-sm">PORTAFOLIO DE PROYECTOS</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/roadmap" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            map_search
                        </span>
                        <p class="text-sm">ROADMAP</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/agenda" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            calendar_month
                        </span>
                        <p class="text-sm">AGENDA</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/tutoriales" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            school
                        </span>
                        <p class="text-sm">TUTORIALES</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="navbar-end" style="width: 25%">
            <ul class="menu menu-horizontal px-1 hidden 2xl:flex">
                <li>
                    <router-link to="/soporte" class="flex flex-col">
                        <span class="material-symbols-outlined">
                            live_help
                        </span>
                        <p class="text-sm">SOPORTE</p>
                    </router-link>
                </li>
            </ul>

            <div class="divider divider-horizontal hidden 2xl:flex"></div>

            <div class="dropdown dropdown-end hidden 2xl:block">
                <div tabindex="0" role="button" class="btn btn-ghost flex items-center">
                    <p>Brandon Juarez</p>
                    <span class="material-symbols-outlined">
                        mood
                    </span>
                </div>
                <div
                    tabindex="0"
                    class="dropdown-content bg-base-200 rounded-box w-80 p-3 shadow-sm"
                >
                    <div class="flex gap-2 items-center justify-center">
                        <span class="material-symbols-outlined" style="font-size: 20px;">
                            mail
                        </span>
                        <p>brandon.juarez@proyectopolis.com</p>
                    </div>

                    <hr class="opacity-20 mt-1" />

                    <ul class="menu w-auto">
                        <li>
                            <router-link to="/perfil" class="flex px-1">
                                <span class="material-symbols-outlined" style="font-size: 20px;">
                                    person
                                </span>
                                <p>Perfil</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/escala-tu-negocio" class="flex px-1">
                                <span class="material-symbols-outlined" style="font-size: 20px;">
                                    signpost
                                </span>
                                <p>Escala tu negocio</p>
                            </router-link>
                        </li>
                        <li>
                            <button class="flex px-1" @click="logOut()">
                                <span class="material-symbols-outlined" style="font-size: 20px;">
                                    logout
                                </span>
                                <p>Cerrar sesión</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <DropDownMobile :log-out="logOut"/>
        </div>
    </div>
</template>
