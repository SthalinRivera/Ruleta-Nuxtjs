<template>
    <div class="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4">Hola</h1>
        <p class="text-lg mb-6">
          Espero que estéis listos para algunos verdad y reveladoras desafíos picantes
        </p>
        <button @click="goToGame" class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-16 rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          ¡Vamos a jugar!
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  
  const router = useRouter();
  
  const goToGame = () => {
    router.push('/player'); // Asegúrate de tener una ruta llamada `/game` configurada
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si los necesitas */
  </style>
  