<script>
	import '../style/main.scss';
</script>

<svelte:head>
	<title>Clave</title>
</svelte:head>

<div class="root">
	<slot />
</div>

<style lang="scss">
	.root {
		border: 1px dashed grey;

		height: 100%;
		width: 350px;
	}
</style>