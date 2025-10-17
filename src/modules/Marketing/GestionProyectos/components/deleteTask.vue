<script setup lang="ts">
import { useProjectStore } from '../store/projectStore';
const projectStore = useProjectStore();
</script>

<template>
  <p>
    ¿Estás seguro que deseas eliminar la tarea
    <span class="!font-semibold"> "{{ projectStore.selectedTask?.title }}" ? </span>
  </p>
</template>