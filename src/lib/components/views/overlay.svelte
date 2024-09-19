<script lang="ts">
	import { fade } from 'svelte/transition';

	/**
	 * @description
	 * If the overlay should block the content
	 */
	export let block: boolean = false;
</script>

<div class="overlay" class:overlay--block={block} transition:fade={{ duration: 200 }}>
	{#if block}
		<div class="overlay__background" transition:fade={{ duration: 200 }} />
	{/if}

	<div class="overlay__content">
		<slot />
	</div>
</div>

<style lang="scss">
	.overlay {
		$root: &;

		z-index: 10;
		pointer-events: none;

		position: absolute;
		top: 0;
		left: 0;

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
			pointer-events: all;
		}

		&--block {
			pointer-events: all;
		}
	}
</style>
