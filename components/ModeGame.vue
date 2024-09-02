<template>
    <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-1">
        <div class="flex flex-col items-center ">
            <div class=" bg-cyan-400 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 font-extrabold dark:text-cyan-50 m-1">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
            </div>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Clásico</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">Cosas casuales para empezar</span>
            <div class="flex mt-1 md:mt-1">
                <button @click="goToGame"
                    class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Jugar</button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const router = useRouter();

const goToGame = () => {
  router.push('/game'); // Asegúrate de tener una ruta llamada `/game` configurada
};
</script>

<style></style>