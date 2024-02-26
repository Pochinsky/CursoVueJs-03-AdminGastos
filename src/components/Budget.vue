<script setup>

</script>

<template>
	<form class="budget">
		<div class="field">
			<label for="new-budget">Definir presupuesto</label>
			<input id="new-budget" type="number" placeholder="Agrega tu presupuesto" />
		</div>
		<input type="submit" value="Definir presupuesto">
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
	transition: background-color 300ms ease;
}

.budget input[type="submit"]:hover {
	background-color: var(--dark-blue);
	cursor: pointer;
}

.field {
	display: grid;
	gap: 2rem;
}
</style>