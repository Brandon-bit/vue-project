<!-- layouts/DashboardLayout.vue -->
<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6">
      <router-view /> <!-- Aquí se renderizan las vistas -->
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/SideBar.vue'
</script>
