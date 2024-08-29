<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-lg mx-4">
      <h2 class="text-2xl font-bold mb-4 text-white">Preguntas Aleatorias</h2>
      <ul v-if="questions.length" class="list-disc list-inside mb-4 space-y-2">
        <li v-for="(question, index) in questions" :key="index" class="text-gray-300">
          {{ question }}
        </li>
      </ul>
      <p v-else class="text-gray-500">No hay preguntas disponibles.</p>
      <button @click="closeModal" class="bg-gray-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-700">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const props = defineProps<{ isVisible: boolean; type: 'verdad' | 'reto'; onClose: () => void }>();
const store = useGameStore();
const questions = ref<string[]>([]);

watchEffect(() => {
  if (props.isVisible) {
    questions.value = [];
    for (let i = 0; i < 5; i++) { // Mostrar hasta 5 preguntas aleatorias
      const question = store.getRandomQuestion(props.type);
      console.log(`Question ${i}:`, question); // Debug
      if (question && !questions.value.includes(question)) {
        questions.value.push(question);
      }
    }
    console.log(`Final Questions:`, questions.value); // Debug
  }
});

const closeModal = () => {
  props.onClose();
};
</script>

<style scoped>
/* No se requieren estilos personalizados porque todo está hecho con Tailwind CSS */
</style>
