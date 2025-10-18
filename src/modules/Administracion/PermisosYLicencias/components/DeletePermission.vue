<script setup lang="ts">
import usePermissionStore from '@/modules/Administracion/PermisosYLicencias/store/permissionStore'
const permissionStore = usePermissionStore()
</script>

<template>
    <p>
        ¿Estás seguro que deseas eliminar la solicitud de
        <span class="!font-semibold"> "{{ permissionStore.selectedPermission?.type }}"</span>?
        Esta acción no se puede deshacer.
    </p>
</template>
