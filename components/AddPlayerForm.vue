<template>
  <div class="">
    <h2 class="text-2xl  mb-4 text-gray-900 dark:text-gray-100 text-center text font-bold">Jugadores</h2>
    <ul class="list-disc list-inside mb-4 space-y-2">
      <li v-for="player in players" :key="player"
        class="flex items-center justify-between py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md">
        <span class="text-lg text-gray-800 dark:text-gray-200">{{ player }}</span>
        <button @click="removePlayer(player)"
          class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </li>
    </ul>
    <div class="flex mb-4 space-x-2">
      <input v-model="newPlayer" placeholder="Agregar jugador"
        class="flex-1 p-2 border border-gray-300 rounded-l-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
      <button @click="addPlayer"
        class=" p-2 rounded-r-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium  text-sm px-5 py-2.5 text-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-8 font-bold">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();
const newPlayer = ref('');

const addPlayer = () => {
  if (newPlayer.value.trim()) {
    store.addPlayer(newPlayer.value.trim());
    newPlayer.value = '';
  }
};

const removePlayer = (player: string) => {
  store.removePlayer(player);
};

const players = computed(() => store.players);
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
