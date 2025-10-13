<script  setup lang="ts">
</script>

<template>

<h2 class="text-center mb-10">
  Detalle producto
</h2>

 <div class="max-w-6xl mx-auto px-6">
    <!-- Row principal -->
    <div class="flex gap-6">

      <!-- Columna izquierda (aprox. 2/3 = col-8) -->
      <div class="w-3/3">
        <div class="grid grid-cols-8 gap-1">

          <!-- Código de barras -->
          <div class="col-span-6 flex justify-start mb-6">
            <div class="w-2/3 h-20 bg-gray-100 border border-dashed border-gray-400 text-gray-500 rounded flex items-center justify-center">
              Código de barras pendiente...
            </div>
          </div>

          <!-- Filas de la tabla -->
          <div class="col-span-3 bg-white p-4 shadow rounded border">
            <p>Columna 1</p>
          </div>
          <div class="col-span-5 bg-white p-4 shadow rounded border">
            <p>Columna 2</p>
          </div>

          <div class="col-span-3 bg-white p-4 shadow rounded border">
            <p>Columna 1</p>
          </div>
          <div class="col-span-5 bg-white p-4 shadow rounded border">
            <p>Columna 2</p>
          </div>

          <div class="col-span-3 bg-white p-4 shadow rounded border">
            <p>Columna 1</p>
          </div>
          <div class="col-span-5 bg-white p-4 shadow rounded border">
            <p>Columna 2</p>
          </div>

        </div>
      </div>

      <!-- Columna derecha (aprox. 1/3 = col-4) -->
      <div class="w-1/3 flex flex-col gap-4">

        <!-- Contenedor 1 -->
        <div class="h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          Imagen placeholder 1
        </div>

        <!-- Contenedor 2 -->
        <div class="h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          Imagen placeholder 2
        </div>

      </div>

    </div>
  </div>
</template>