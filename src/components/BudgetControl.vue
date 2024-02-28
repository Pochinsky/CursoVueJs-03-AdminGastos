<script setup>
import { computed } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import image from "../assets/img/grafico.jpg";
import { formatQuantity } from "../helpers";

const props = defineProps({
  budget: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  totalSpent: {
    type: Number,
    required: true,
  },
});

defineEmits(["reset-app"]);

const percentage = computed(() => {
  return parseInt(((props.budget - props.available) * 100) / props.budget);
});
</script>

<template>
  <div class="two-cols">
    <div class="container-graphic">
      <p class="percentage">{{ percentage }}%</p>
      <CircleProgress
        :percent="percentage"
        size="200"
        border-width="20"
        border-bg-width="20"
        fill-color="#3b82f6"
        empty-color="#e1e1e1"
      />
    </div>
    <div class="container-budget">
      <button type="button" class="reset-app" @click="$emit('reset-app')">
        Resetear App
      </button>
      <p><span>Presupuesto: </span>{{ formatQuantity(budget) }}</p>
      <p><span>Disponible: </span>{{ formatQuantity(available) }}</p>
      <p><span>Gastado: </span>{{ formatQuantity(totalSpent) }}</p>
    </div>
  </div>
</template>

<style scoped>
.container-graphic {
  position: relative;
}

.percentage {
  position: absolute;
  margin: auto;
  top: calc(50% - 1.5rem);
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;
  font-size: 3rem;
  font-weight: 900;
  color: var(--dark-gray);
}

.two-cols {
  display: flex;
  flex-direction: column;
}

.two-cols > :first-child {
  margin-bottom: 2rem;
}

.container-budget {
  width: 100%;
}

.container-budget p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--dark-gray);
}

.container-budget span {
  font-weight: 700;
  color: var(--blue);
}

.reset-app {
  background-color: var(--light-red);
  border: none;
  padding: 1rem;
  width: 100%;
  color: var(--white);
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 1rem;
  transition-property: background-color;
  transition-duration: 300ms;
}

.reset-app:hover {
  cursor: pointer;
  background-color: #c11d67;
}

@media (min-width: 768px) {
  .two-cols {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }

  .two-cols > :first-child {
    margin-bottom: 0;
  }

  .container-budget p {
    text-align: left;
  }
}
</style>
