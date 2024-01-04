<script lang="ts">
	import '../style/main.scss';

	import Head from '$lib/layout/head.svelte';
	import Foot from '$lib/layout/foot.svelte';
</script>

<svelte:head>
	<title>Clave</title>
</svelte:head>

<div class="root">
	<Head />

	<main class="body">
		<slot />
	</main>

	<Foot />
</div>

<style lang="scss">
	.root {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;

		.body {
			flex: 1;
			padding: 16px;
		}
	}
</style>
