<template>
  <div class="">
    <div class="p-6 max-w-md mx-auto  shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
        Generar verdad y retos con IA.
      </h2>
      <div class="mb-4">
        <input v-model="userInput" placeholder="Ejemplo: Hot, amor, para parejas ..."
          class="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 rounded w-full" />

        <div  class="flex mt-2 w-full">
          <button @click="generateAndPreviewQuestions"
            class="relative inline-flex items-center justify-center w-full mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span> Generar </span> </button>
          <button @click="saveQuestions"
            class="relative inline-flex items-center justify-center p-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </button>
        </div>

        <p v-if="response" class="mt-2 text-gray-700 dark:text-gray-300">
          {{ response }}
        </p>
      </div>

      <!-- Indicador de carga -->
      <div v-if="isLoading" class="flex justify-center items-center h-32">
        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 p-4">
          <div class="p-2 sm:w-1/2 w-full">
            <div class="bg-gray-100 dark:bg-gray-700 rounded flex p-4 h-full items-center">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                class="text-indigo-500 dark:text-indigo-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span class="font-medium text-gray-800 dark:text-gray-200">
                Cargando...
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="generatedQuestions.length" class="mt-4">
        <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          Preguntas Generadas
        </h3>
        <ul>
          <li v-for="(question, index) in generatedQuestions" :key="index"
            class="mb-2 text-gray-800 dark:text-gray-300">
            <span class="font-semibold">{{ question.type }}:</span>
            {{ question.question }}
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGameStore } from '~/stores/gameStore';

const userInput = ref('');
const response = ref<string | null>(null);
const isLoading = ref(false); // Estado de carga
const gameStore = useGameStore();

const generateAndPreviewQuestions = async () => {
  isLoading.value = true; // Activar carga
  try {
    await gameStore.fetchAndPreviewQuestions(userInput.value);
    response.value = 'Preguntas generadas.';
  } catch (error) {
    console.error('Error generando preguntas:', error);
    response.value = 'Error al generar preguntas.';
  } finally {
    isLoading.value = false; // Desactivar carga
  }
};
const saveQuestions = () => {
  if (gameStore.generatedQuestions.length > 0) {
    gameStore.generatedQuestions.forEach(question => {
      gameStore.addQuestion(question.type, question.question);
    });
    response.value = 'Preguntas guardadas en LocalStorage.';
  } else {
    response.value = 'No hay preguntas para guardar.';
  }
};

const generatedQuestions = computed(() => gameStore.generatedQuestions);
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
