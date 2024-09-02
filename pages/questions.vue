<template>
  <div class="p-4 h-full max-w-md mx-auto">

    <AddQuestionForm />
    <div class="flex justify-center items-center mb-20">
      <button @click="goToGame"
        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span
          class="relative px-12 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Jugar
        </span></button>
    </div>

  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const goToGame = () => {
  router.push('/game'); // Asegúrate de tener una ruta llamada `/game` configurada
};
</script>
