<template>
  <div class="alert">
    <slot></slot>
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.6rem;
  text-align: center;
  background-color: var(--white);
  border-left: 0.5rem solid var(--red);
  color: var(--red);
  margin-bottom: 2rem;
}
</style>
