<template>
  <div>
    <!-- Primer Modal -->
    <div v-if="isMainModalVisible" class="fixed inset-0 bg-gray-900 bg-opacity-100 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 md:p-12 rounded-lg w-full max-w-full mx-4 md:mx-6 lg:mx-8 xl:mx-16 overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4 text-white">Jugador Seleccionado</h2>
        <p class="text-lg text-center text-gray-300">{{ player }}</p>

        <div class="mt-4 text-center">
          <h3 class="text-lg font-bold mb-2 text-white">Elige:</h3>
          <button @click="openQuestionsModal('verdad')" class="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700">Verdad</button>
          <button @click="openQuestionsModal('reto')" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Reto</button>
        </div>

        <button @click="closeMainModal" class="bg-gray-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-700">
          Cerrar
        </button>
      </div>
    </div>

    <!-- Modal de Preguntas -->
    <QuestionsModal
      :isVisible="isQuestionsModalVisible"
      :type="selectedType"
      :question="currentQuestion"  
      @onClose="closeQuestionsModal"
    />
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
