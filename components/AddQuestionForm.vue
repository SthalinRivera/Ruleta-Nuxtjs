<template>
  <div class="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Preguntas</h2>
    <ul class="list-disc list-inside mb-4 space-y-2">
      <li v-for="question in questions" :key="question.question" class="flex items-center justify-between py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md">
        <span class="text-gray-800 dark:text-gray-200">
          {{ question.type }}: {{ question.question }}
        </span>
        <button @click="removeQuestion(question.question)" class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </li>
    </ul>
    <div class="flex mb-4 space-x-2">
      <input v-model="newQuestion" placeholder="Agregar pregunta" class="flex-1 p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
      <button @click="addQuestion" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
        Agregar
      </button>
    </div>
    <div class="mb-4">
      <select v-model="questionType" class="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100">
        <option value="verdad">Verdad</option>
        <option value="reto">Reto</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();
const newQuestion = ref('');
const questionType = ref('verdad');

const addQuestion = () => {
  if (newQuestion.value.trim()) {
    store.addQuestion(questionType.value, newQuestion.value.trim());
    newQuestion.value = '';
  }
};

const removeQuestion = (question: string) => {
  store.removeQuestion(question);
};

const questions = computed(() => store.questions);
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
