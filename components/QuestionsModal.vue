<template>
<div class="max-w-lg mx-auto items-center">
 <div v-if="isVisible" class="fixed inset-0 bg-gray-900 bg-opacity-100 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-lg mx-4 relative">
      <h2 class="text-2xl font-bold mb-4 text-white">Pregunta: {{ type === 'verdad' ? 'Verdad' : 'Reto' }}</h2>
      <p class="text-lg text-gray-300 mb-4">{{ question }}</p>
      
      <div v-if="timeLeft > 0" class="text-lg text-white">
        Tiempo restante: {{ timeLeft }} segundos
      </div>
      <div v-else class="text-lg text-red-500">
        ¡Se acabó el tiempo!
      </div>

      <div class="flex justify-between mt-6">
        <button @click="handleResponse(true)" class="bg-green-500 text-white p-4 rounded-full flex items-center hover:bg-green-600">
          <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
    
        </button>
        <button @click="handleResponse(false)" class="bg-red-500 text-white p-4 rounded-full flex items-center hover:bg-red-600">
          <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
     
        </button>
      </div>
      
      <button @click="closeModal" class="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
  </div>
 
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{ isVisible: boolean; type: 'verdad' | 'reto'; question: string }>();
const emit = defineEmits<{ (e: 'onClose'): void; (e: 'onResponse', accepted: boolean): void }>();

const timeLeft = ref(30); // 30 segundos para responder

let timer: number;

const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    timeLeft.value = 30;
    startTimer();
  } else {
    clearInterval(timer);
  }
});

onUnmounted(() => {
  clearInterval(timer);
});

const closeModal = () => {
  clearInterval(timer);
  emit('onClose');
};

const handleResponse = (accepted: boolean) => {
  clearInterval(timer);
  emit('onResponse', accepted);
  closeModal();
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
