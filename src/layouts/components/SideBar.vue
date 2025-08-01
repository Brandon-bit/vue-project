<template>
  <div class="flex h-screen bg-[#1D1D1B] text-white w-64 flex-col justify-between">
    <!-- Top section -->
    <div>
      <!-- Logo -->
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <span class="text-xl font-bold">⚙️ Mate</span>
        <button class="text-gray-400 hover:text-white">&lt;</button>
      </div>

      <!-- Search -->
      <div class="p-4">
        <input
          type="text"
          placeholder="Search"
          class="w-full bg-gray-800 text-sm text-white placeholder-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Navigation -->
      <nav class="px-2 space-y-1">
        <SidebarItem icon="🏠" label="Dashboard" />
        <SidebarItem icon="📦" label="Orders" active />
        <SidebarItem icon="📋" label="Inventory" />
        <SidebarItem icon="💳" label="Payments" />
        <SidebarItem icon="👥" label="Customers" />
      </nav>

      <!-- Extras -->
      <div class="mt-6 border-t border-gray-700 pt-4 px-2 space-y-1">
        <SidebarItem icon="🔔" label="Notifications" badge="7" />
        <SidebarItem icon="❓" label="Help & support" />
        <SidebarItem icon="⚙️" label="Settings" />
      </div>
    </div>

    <!-- Bottom: user -->
    <div class="p-4 border-t border-gray-700 flex items-center gap-3">
      <div class="w-8 h-8 bg-gray-600 rounded-full"></div>
      <div class="text-sm">
        <div class="font-medium">Olivia Williams</div>
        <div class="text-gray-400">Admin</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
</script>
