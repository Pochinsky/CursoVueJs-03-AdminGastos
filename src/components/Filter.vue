<script setup>
import { categoryExpenditureOptions } from "../helpers/constants";

defineProps({
  filter: {
    type: String,
    required: true,
  },
});

defineEmits(["update:filter"]);
</script>

<template>
  <div class="container shadow filter">
    <form>
      <div class="field">
        <label for="filter">Filtrar Gastos</label>
        <select
          name="filter"
          id="filter"
          :value="filter"
          @input="
            $emit(
              'update:filter',
              $event.target.value === 'Todos los gastos'
                ? ''
                : $event.target.value
            )
          "
        >
          <option value="">Todos los gastos</option>
          <option
            v-for="expenditureOption in categoryExpenditureOptions"
            :value="expenditureOption.value"
          >
            {{ expenditureOption.content }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
.filter {
  margin-top: 10rem;
  padding: 2rem 5rem;
}

.filter .field {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filter label {
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--dark-gray);
}

.filter select {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--light-gray);
  text-align: center;
}

.filter select:focus {
  outline: none;
  border: 0.3rem solid var(--blue);
}
</style>
