<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const store = useGameStore();

onMounted(() => {
  store.loadFromLocalStorage();
});
</script>