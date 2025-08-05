<template>
    <div class="dropdown dropdown-end 2xl:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost flex items-center">
            <i class="fas fa-bars text-2xl"></i>
        </div>
        <div tabindex="0" class="dropdown-content bg-base-200 rounded-box w-80 p-3 shadow-sm">
            <div class="flex items-center">
                <i class="fas fa-globe fa-sm fa-fw mr-2 text-gray-400"></i>
                <p>Navegación</p>
            </div>

            <hr class="opacity-20 mt-1" />

            <ul class="menu w-auto">
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-file-export fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Exportar</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-tasks fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Lista de pendientes</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-tachometer-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Indicadores</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-search fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Portafolio de proyectos</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-map-marked-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Roadmap</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-calendar-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Agenda</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-graduation-cap fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Tutoriales</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-question fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Soporte</p>
                    </router-link>
                </li>
            </ul>

            <div class="flex items-center">
                <i class="fas fa-envelope fa-sm fa-fw mr-2 text-gray-400"></i>
                <p>brandon.juarez@proyectopolis.com</p>
            </div>

            <hr class="opacity-20 mt-1" />

            <ul class="menu w-auto">
                <li>
                    <router-link to="#" class="flex px-1">
                        <i class="fas fa-user-cog fa-sm fa-fw mr-2 text-gray-400"></i>
                        <p>Perfil</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="flex px-1">
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
</template>
