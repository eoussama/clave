<script lang="ts">
	import { fade } from 'svelte/transition';

	/**
	 * @description
	 * If the overlay should block the content
	 */
	export let block: boolean = false;
</script>

<div class="overlay">
	{#if block}
		<div class="overlay__background" transition:fade={{ duration: 200 }} />
	{/if}

	<div class="overlay__content">Content</div>
</div>

<style lang="scss">
	.overlay {
		$root: &;

		z-index: 10;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		margin: auto;

		&__background {
			position: absolute;
			left: 0;
			top: 0;

			width: 100%;
			height: 100%;

			backdrop-filter: blur(8px);
			background-color: rgba(var(--color-secondary-rgb), 0.4);
		}

		&__content {
			z-index: 12;
		}
	}
</style>
