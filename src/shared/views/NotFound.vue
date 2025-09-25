<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <h1 class="text-9xl font-bold text-blue-600">404</h1>
    <h2 class="mt-4 text-2xl font-semibold">Página no encontrada</h2>
    <p class="mt-2 text-gray-600">
      Lo sentimos, la página que buscas no existe o fue movida.
    </p>
    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    >
      Volver al inicio
    </router-link>
  </div>
</template>

