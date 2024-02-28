<script setup>
import { ref } from "vue";
import Alert from "./Alert.vue";
import { categoryExpenditureOptions } from "../helpers/constants";
import closeModalIcon from "../assets/img/cerrar.svg";

const error = ref("");

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  id: {
    type: [String, null],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  "update:name",
  "update:quantity",
  "update:category",
  "close-modal",
  "save-expenditure",
  "delete-expenditure",
]);

const inputQuantity = props.quantity;

const showError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = "";
  }, 3000);
};

const addExpenditure = () => {
  // validate empty fields
  const { available, id, name, quantity, category } = props;
  if ([name, quantity, category].includes("")) {
    showError("Todos los campos son obligatorios");
    return;
  }
  // validate quantity
  if (quantity <= 0) {
    showError("Monto no válido");
    return;
  }
  // validate that expenses not are more than available
  if ((id && quantity > inputQuantity + available) || quantity > available) {
    showError("Presupuesto excedido");
    return;
  }
  // emit expenditure
  emit("save-expenditure");
};
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img
        :src="closeModalIcon"
        alt="icono cerrar modal"
        @click="$emit('close-modal')"
      />
    </div>
    <div
      class="container container-form"
      :class="[modal.animate ? 'animate' : 'close']"
    >
      <form class="new-expenditure" @submit.prevent="addExpenditure">
        <legend>{{ id ? "Editar Gasto" : "Agregar Gasto" }}</legend>
        <Alert v-if="error">{{ error }}</Alert>
        <div class="field">
          <label for="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre del gasto"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>
        <div class="field">
          <label for="quantity">Monto:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Monto del gasto"
            :value="quantity"
            @input="$emit('update:quantity', +$event.target.value)"
          />
        </div>
        <div class="field">
          <label for="category">Categoría:</label>
          <select
            name="category"
            id="category"
			
            :value="category"
            @input="
              $emit(
                'update:category',
                $event.target.value === '-- Seleccione --'
                  ? ''
                  : $event.target.value
              )
            "
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="expenditureOption in categoryExpenditureOptions"
              :value="expenditureOption.value"
            >
              {{ expenditureOption.content }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          :value="[id ? 'Actualizar Gasto' : 'Guardar Gasto']"
        />
      </form>
      <button
        v-if="id"
        type="button"
        class="btn-delete"
        @click="$emit('delete-expenditure', id)"
      >
        Eliminar Gasto
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.close-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
}

.container-form {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.container-form.animate {
  opacity: 1;
}

.container-form.close {
  opacity: 0;
}

.new-expenditure {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.new-expenditure legend {
  text-align: center;
  color: var(--white);
  font-size: 3rem;
  font-weight: 700;
}

.field {
  display: grid;
  gap: 1rem;
}

.new-expenditure input,
.new-expenditure select,
.btn-delete {
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}

.new-expenditure input:focus,
.new-expenditure select:focus {
  outline: none;
  border: 0.3rem solid var(--blue);
}

.new-expenditure label {
  color: var(--white);
  font-size: 3rem;
}

.new-expenditure input[type="submit"],
.btn-delete {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 300ms ease;
}

.new-expenditure input[type="submit"]:hover {
  background-color: var(--dark-blue);
}

.btn-delete {
  width: 100%;
  background-color: #ef4444;
  margin-top: 3rem;
}

.btn-delete:hover {
  background-color: #9d200a;
}
</style>
