<template>
  <div class="p-4 max-w-lg mx-auto bg-white dark:bg-gray-800 h-screen ">
    <AplicactionBarMovil />
    <AddPlayerForm />

    <div class="justify-center">
      <button @click="goToGame"
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-16 rounded-full shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
        Jugar
      </button>
    </div>
    <ApplicationBar />
  </div>
</template>

<script setup lang="ts">
  const router = useRouter();
  
  const goToGame = () => {
    router.push('/modoJuego'); // Asegúrate de tener una ruta llamada `/game` configurada
  };
</script>
