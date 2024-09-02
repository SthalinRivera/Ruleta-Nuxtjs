<template>
  <div class="max-w-lg mx-auto items-center">
    <!-- Primer Modal -->
    <div v-if="isMainModalVisible"
      class="fixed inset-0 bg-gray-900 bg-opacity-100 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg w-full max-w-lg mx-4 relative">
        <h2 class="text-lg font-bold mb-4 text-slate-300">Jugador Seleccionado</h2>
        <p class=" text-center text-2xl font-bold text-gray-100">{{ player }}</p>

        <div class="mt-4 text-center">
          <h3 class="text-lg font-bold mb-2 text-white">Elige:</h3>
        <button @click="openQuestionsModal('verdad')"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            😇  Verdad
          </span>
        </button>
        <button @click="openQuestionsModal('reto')"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            😈  Reto
          </span>
        </button>

        <button @click="closeMainModal" class="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      </div>
     
        
      </div>
    </div>

    <!-- Modal de Preguntas -->
    <QuestionsModal :isVisible="isQuestionsModalVisible" :type="selectedType" :question="currentQuestion"
      @onClose="closeQuestionsModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import QuestionsModal from '@/components/QuestionsModal.vue';

const props = defineProps<{ player: string }>();
const emit = defineEmits<{ (e: 'close'): void }>();
const store = useGameStore();

const isMainModalVisible = ref(true);
const isQuestionsModalVisible = ref(false);
const selectedType = ref<'verdad' | 'reto'>('verdad');
const currentQuestion = ref<string | null>(null);  // Añade una referencia para la pregunta

const openQuestionsModal = (type: 'verdad' | 'reto') => {
  selectedType.value = type;
  currentQuestion.value = store.getRandomQuestion(type);  // Obtén la pregunta aleatoria
  console.log(`Selected Type: ${type}`);  // Debug
  console.log(`Current Question: ${currentQuestion.value}`);  // Debug
  isQuestionsModalVisible.value = true;


};

const closeMainModal = () => {
  isMainModalVisible.value = false;
  emit('close');
};

const closeQuestionsModal = () => {
  isQuestionsModalVisible.value = false;
};
</script>

<style scoped>
/* No se requieren estilos personalizados porque todo está hecho con Tailwind CSS */
</style>
