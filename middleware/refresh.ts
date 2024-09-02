// middleware/refresh.ts
import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  // Aquí puedes colocar la lógica para actualizar los datos
  console.log('La ruta ha cambiado. Actualizando datos...');
});
