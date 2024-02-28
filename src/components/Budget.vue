<script setup>
import { ref } from "vue";
import Alert from "./Alert.vue";

// state
const budget = ref(0);
const error = ref("");

// emits
const emit = defineEmits(["set-budget"]);

// handlers
const setBudget = () => {
  if (budget.value <= 0 || budget.value === "") {
    error.value = "presupuesto no válido";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }
  emit("set-budget", budget.value);
};
</script>

<template>
  <form class="budget" @submit.prevent="setBudget">
    <Alert v-if="error">
      {{ error }}
    </Alert>
    <div class="field">
      <label for="new-budget">Definir presupuesto</label>
      <input
        id="new-budget"
        type="number"
        min="0"
        placeholder="Agrega tu presupuesto"
        v-model.number="budget"
      />
    </div>
    <input type="submit" value="Definir presupuesto" />
  </form>
</template>

<style scoped>
.budget {
  width: 100%;
}

.budget label {
  font-size: 2.8rem;
  text-align: center;
  color: var(--blue);
}

.budget input[type="number"] {
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;
}

.budget input[type="number"]:focus {
  outline: none;
  border: 0.2rem solid var(--blue);
}

.budget input[type="submit"] {
  background-color: var(--blue);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  color: var(--white);
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  transition: background-color 300ms ease;
}

.budget input[type="submit"]:hover {
  background-color: var(--dark-blue);
}

.field {
  display: grid;
  gap: 2rem;
}
</style>
