<template>
    <h2>Dashboard</h2>

    <div class="mt-5 flex gap-2">
        <button class="btn btn-neutral">Neutral</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-info">Info</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-error">Error</button>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .color-box {
      width: 120px;
      height: 80px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-family: sans-serif;
      border-radius: 6px;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
</style>
