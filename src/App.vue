<script setup>
import Budget from './components/Budget.vue'
</script>

<template>
  <div>
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="container-header container shadow">
        <Budget />
      </div>
    </header>
  </div>
</template>

<style>
:root {
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
}

.shadow {
  box-shadow: 8px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 2rem;
  padding: 5rem;
}
</style>
