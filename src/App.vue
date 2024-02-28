<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import Budget from "./components/Budget.vue";
import BudgetControl from "./components/BudgetControl.vue";
import Modal from "./components/Modal.vue";
import Expenditure from "./components/Expenditure.vue";
import Filter from "./components/Filter.vue";
import { generateId } from "./helpers";
import newExpenditureIcon from "./assets/img/nuevo-gasto.svg";

// states
const budget = ref(0);
const available = ref(0);
const totalSpent = ref(0);
const filter = ref("");
const expenses = ref([]);
const modal = reactive({
  show: false,
  animate: false,
});
const expenditure = reactive({
  name: "",
  quantity: "",
  category: "",
  id: null,
  date: Date.now(),
});

const resetExpenditure = () => {
  Object.assign(expenditure, {
    name: "",
    quantity: "",
    category: "",
    id: null,
    date: Date.now(),
  });
};

// init states
onMounted(() => {
  const budgetLocalStorage = localStorage.getItem("budget");
  const totalSpentLocalStorage = localStorage.getItem("totalSpent");
  const expensesLocalStorage = localStorage.getItem("expenses");
  if (budgetLocalStorage) budget.value = Number(budgetLocalStorage);
  if (totalSpentLocalStorage) totalSpent.value = Number(totalSpentLocalStorage);
  if (expensesLocalStorage) expenses.value = JSON.parse(expensesLocalStorage);
  available.value = budget.value - totalSpent.value;
});

// listeners
watch(
  expenses,
  () => {
    totalSpent.value = expenses.value.reduce(
      (total, expenditure) => expenditure.quantity + total,
      0
    );
    available.value = budget.value - totalSpent.value;
    localStorage.setItem("totalSpent", totalSpent.value);
    localStorage.setItem("expenses", JSON.stringify(expenses.value));
  },
  { deep: true }
);

watch(
  modal,
  () => {
    if (!modal.show) resetExpenditure();
  },
  { deep: true }
);

watch(budget, () => {
  localStorage.setItem("budget", budget.value);
});

// functions
const setBudget = (quantity) => {
  budget.value = quantity;
  available.value = quantity;
};

const showModal = () => {
  modal.show = true;
  setTimeout(() => {
    modal.animate = true;
  }, 300);
};

const closeModal = () => {
  modal.animate = false;
  setTimeout(() => {
    modal.show = false;
  }, 300);
};

const saveExpenditure = () => {
  if (expenditure.id) {
    const { id } = expenditure;
    const index = expenses.value.findIndex(
      (expenditure) => expenditure.id === id
    );
    expenses.value[index] = { ...expenditure };
  } else expenses.value.push({ ...expenditure, id: generateId() });
  closeModal();
  resetExpenditure();
};

const selectExpenditure = (id) => {
  const editExpenditure = expenses.value.filter(
    (expenditure) => expenditure.id === id
  )[0];
  Object.assign(expenditure, editExpenditure);
  showModal();
};

const deleteExpenditure = (id) => {
  if (confirm("¿Desea eliminar el gasto?")) {
    expenses.value = expenses.value.filter(
      (expenditure) => expenditure.id !== id
    );
    closeModal();
  }
};

const filteredExpenses = computed(() => {
  if (filter.value)
    return expenses.value.filter(
      (expenditure) => expenditure.category === filter.value
    );
  return expenses.value;
});

const resetApp = () => {
  if (confirm("¿Deseas reiniciar tu presupuesto y tus gastos?")) {
    expenses.value = [];
    budget.value = 0;
  }
};
</script>

<template>
  <div :class="{ fix: modal.show }">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="container-header container shadow">
        <Budget v-if="budget === 0" @set-budget="setBudget" />
        <BudgetControl
          v-else
          :budget="budget"
          :available="available"
          :totalSpent="totalSpent"
          @reset-app="resetApp"
        />
      </div>
    </header>
    <main v-if="budget > 0">
      <Filter v-if="expenses.length > 0" v-model:filter="filter" />
      <div
        class="container expenses-list"
        :class="[expenses.length > 0 ? 'reduce-mt' : '']"
      >
        <h2>{{ filteredExpenses.length > 0 ? "Gastos" : "No hay gastos" }}</h2>
        <Expenditure
          v-for="expenditure in filteredExpenses"
          :key="expenditure.id"
          :expenditure="expenditure"
          @select-expenditure="selectExpenditure"
        />
      </div>
      <div class="create-expenditure">
        <img
          :src="newExpenditureIcon"
          alt="icono nuevo gasto"
          @click="showModal"
        />
      </div>
      <Modal
        v-if="modal.show"
        :modal="modal"
        :available="available"
        :id="expenditure.id"
        v-model:name="expenditure.name"
        v-model:quantity="expenditure.quantity"
        v-model:category="expenditure.category"
        @close-modal="closeModal"
        @save-expenditure="saveExpenditure"
        @delete-expenditure="deleteExpenditure"
      />
    </main>
  </div>
</template>

<style>
:root {
  --red: #b91c1c;
  --light-red: #db2777;
  --blue: #3b82f6;
  --dark-blue: #1048a4;
  --white: #fff;
  --black: #000;
  --gray: #94a3b8;
  --light-gray: #f5f5f5;
  --dark-gray: #64748b;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:after,
*:before {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--light-gray);
}

.fix {
  overflow: hidden;
  height: 100vh;
}

header {
  background-color: var(--blue);
}

h1 {
  font-size: 4rem;
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
}

h2 {
  font-size: 3rem;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .container-header {
    display: block;
  }
}

.shadow {
  box-shadow: 8px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 2rem;
  padding: 5rem;
}

.create-expenditure {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expenditure img {
  width: 5rem;
  cursor: pointer;
}

.expenses-list {
  margin-top: 10rem;
}

.reduce-mt {
  margin-top: 4rem;
}

.expenses-list h2 {
  font-weight: 700;
  color: var(--dark-gray);
}
</style>
