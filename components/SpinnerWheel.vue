<template>

  <div class="">
    <div class="flex justify-center overflow-hidden mt-10">
      <div class="wheel-wrapper">
        <canvas ref="wheelCanvas" width="600" height="600"></canvas>
        <div class="spin-icon border-2 border-cyan-100 bg-slate-50" @click="toggleSpin">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </div>

      <div class="mark-winner" :style="markWinnerStyle"></div>
      <TruthOrDareModal v-if="isModalOpen" :player="selectedPlayer" @close="isModalOpen = false" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useGameStore } from '@/stores/gameStore';


const store = useGameStore();
const spinning = ref(false);
const selectedPlayer = ref<string | null>(null);
const wheelCanvas = ref<HTMLCanvasElement | null>(null);
const isModalOpen = ref(false);

const rotation = ref(0);
const pos_ini = ref(0);
let movement: number | null = null;
let speed = ref(10);

const drawWheel = () => {
  const canvas = wheelCanvas.value;
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const center = canvas.width / 2;
  const radius = center;

  context.beginPath(); // Inicia un nuevo camino en el contexto del canvas
  context.arc(center, center, radius, 0, 2 * Math.PI); // Dibuja un círculo con el centro en (center, center) y radio 'radius'
  context.fillStyle = '#33333333'; // Establece el color de relleno del primer círculo (gris oscuro con opacidad)
  context.fill(); // Rellena el primer círculo con el color gris oscuro
  context.beginPath(); // Inicia un nuevo camino para el siguiente dibujo
  context.arc(center, center, radius - 10, 0, 2 * Math.PI); // Dibuja un segundo círculo con el mismo centro pero un radio 10 píxeles menor
  context.fillStyle = 'black'; // Establece el color de relleno del segundo círculo (negro)
  context.fill(); // Rellena el segundo círculo con el color negro
  // Draw each segment
  store.players.forEach((player, i) => {
    const startAngle = (i / store.players.length) * 2 * Math.PI;
    const endAngle = ((i + 1) / store.players.length) * 2 * Math.PI;
    context.beginPath();
    context.moveTo(center, center);
    context.arc(center, center, radius - 20, startAngle, endAngle);
    context.lineTo(center, center);
    context.fillStyle = randomColor();
    context.fill();
    context.save();
    context.translate(center, center);
    context.rotate((startAngle + endAngle) / 2);
    context.translate(-center, -center);
    context.font = '24px Comic Sans MS'; // Cambiar tamaño de fuente aquí
    context.textAlign = 'right'; // Cambiar alineación de texto para centrar
    context.fillStyle = 'white';
    context.fillText(player, canvas.width - 30, center); // Ajusta la posición del texto si es necesario
    context.restore();
  });
};

const randomColor = () => {
  const ar_digit = ['9', '1', '2', '3', '4', '5', '8'];
  let color = '';
  for (let i = 0; i < 6; i++) {
    const pos = Math.floor(Math.random() * ar_digit.length);
    color += ar_digit[pos];
  }
  return `#${color}`;
};

const toggleSpin = () => {
  if (spinning.value) {
    clearInterval(movement as number);
    spinning.value = false;
    stopWheelGradually();  // Llamamos a la función que detiene lentamente la rueda
  } else {
    speed.value = 10;  // Velocidad inicial de giro
    movement = setInterval(() => {
      pos_ini.value += speed.value;
      if (wheelCanvas.value) {
        wheelCanvas.value.style.transform = `rotate(${pos_ini.value}deg)`;
      }
    }, 20);
    spinning.value = true;

    setTimeout(() => {
      spinning.value = false;
      stopWheelGradually();  // Después de 2 segundos, empezamos a reducir la velocidad
    }, 1000);
  }
};

const stopWheelGradually = () => {
  const reduceSpeed = setInterval(() => {
    if (speed.value > 0) {
      speed.value -= 0.1;  // Reducimos la velocidad poco a poco
    } else {
      clearInterval(reduceSpeed);
      speed.value = 0;
      selectRandomPlayer();  // Una vez que la rueda se detiene, seleccionamos un jugador
    }
  }, 10);
};

const selectRandomPlayer = () => {
  const index = Math.floor(Math.random() * store.players.length);
  selectedPlayer.value = store.players[index];
};

const markWinnerStyle = computed(() => {
  if (!selectedPlayer.value) return {};
  const playerIndex = store.players.indexOf(selectedPlayer.value);
  const angle = (playerIndex / store.players.length) * 360;
  const translateX = 50 * Math.cos(angle * (Math.PI / 180));
  const translateY = 50 * Math.sin(angle * (Math.PI / 180));
  return {
    transform: `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`
  };
});

// Mostrar el modal cuando selectedPlayer cambia
watch(selectedPlayer, (newValue) => {
  if (newValue) {
    isModalOpen.value = true;
  }
});

onMounted(() => {
  drawWheel();
});
</script>

<style scoped>
.wheel-wrapper {
  position: relative;
}

canvas {
  margin-top: 10px;
  position: relative;
  z-index: 1;
  width: 300px;

}

.spin-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 1);
  border-radius: 100%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  border-color: blanchedalmond;
  border: 12px;
}


@media (max-width: 600px) {
  canvas {
    width: 300px;
    /* Ajusta el ancho del canvas */
    height: 300px;
    /* Ajusta la altura del canvas */
  }
}
</style>
