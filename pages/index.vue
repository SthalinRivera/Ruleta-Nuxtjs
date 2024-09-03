<template>
  <div>
    <HomeScreen />
  </div>
</template>

<script setup lang="ts">


const route = useRoute();

const refreshData = () => {
  console.log('Actualizando datos cuando cambie la ruta...');
};

// Middleware para observar cambios de ruta
defineNuxtRouteMiddleware(() => {
  refreshData();
});

// Ejecutar la función antes de que el componente se monte
onBeforeMount(() => {
  refreshData();
});
</script>
