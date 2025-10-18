<template>
    <div class="flex bg-[var(--black)] h-screen overflow-hidden">
        <div
            :class="[
                'transition-all duration-300',
                isSmallScreen ? 'w-0' : showSidebar ? 'w-64' : 'w-18'
            ]"
        >
            <component :is="isSmallScreen ? Drawer : Sidebar" />
        </div>
        <div
            :class="[
                'flex flex-col flex-1 bg-[var(--color-base-100)] rounded overflow-hidden',
                isSmallScreen ? 'm-2' : showSidebar ? 'm-2' : 'my-2 mr-2'
            ]"
        >
            <div>
                <NavBar />
            </div>
            <main class="h-screen overflow-auto scrollbar-hide px-10 py-6">
                <div class="w-full lg:max-w-[90%] lg:mx-auto">
                    <router-view />
                </div>
                <!-- Aquí se renderizan las vistas -->
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted, onBeforeMount } from 'vue'
import Sidebar from '@core/InSessionLayout/components/SideBar.vue'
import NavBar from '@core/InSessionLayout/components/NavBar.vue'
import Drawer from '@core/InSessionLayout/components/Drawer.vue'
import { useInSessionActions } from '@core/InSessionLayout/composables/useInSessionActions'

const showSidebar = ref(false)
const showLogo = ref(true)
const isSmallScreen = ref(false)

const checkScreen = () => {
    isSmallScreen.value = window.matchMedia('(max-width: 768px)').matches
}

onBeforeMount(() => {
    useInSessionActions().getDashboards()
    useInSessionActions().getModules()
})

onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreen)
})

provide('showSidebar', showSidebar)
provide('showLogo', showLogo)
provide('isSmallScreen', isSmallScreen)
//provide('modulos', modulos)
</script>
<style>
.scrollbar-hide {
    -ms-overflow-style: none; /* IE y Edge */
    scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari y Opera */
}
</style>
