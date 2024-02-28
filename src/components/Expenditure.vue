<script setup>
import { formatQuantity, formatDate } from "../helpers";
import { iconsDict } from "../helpers/constants";

const props = defineProps({
  expenditure: {
    type: Object,
    required: true,
  },
});

defineEmits(["select-expenditure"]);
</script>

<template>
  <div class="expenditure shadow">
    <div class="content">
      <img
        class="icon"
        :src="iconsDict[expenditure.category]"
        alt="icono gasto"
      />
      <div class="details">
        <p class="category">{{ expenditure.category }}</p>
        <p class="name" @click="$emit('select-expenditure', expenditure.id)">
          {{ expenditure.name }}
        </p>
        <p class="date">
          Fecha: <span>{{ formatDate(expenditure.date) }}</span>
        </p>
      </div>
    </div>
    <p class="quantity">{{ formatQuantity(expenditure.quantity) }}</p>
  </div>
</template>

<style scoped>
.expenditure {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.icon {
  width: 5rem;
}

.details p {
  margin: 0 0 1rem 0;
}

.category {
  color: var(--gray);
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.name {
  color: var(--dark-gray);
  font-size: 2.4rem;
  font-weight: 900;
  cursor: pointer;
}

.date {
  color: var(--dark-gray);
  font-size: 1.6rem;
  font-weight: 700;
}

.date span {
  font-weight: 500;
}

.quantity {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
</style>
