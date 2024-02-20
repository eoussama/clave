<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { appStore } from '$lib/core/stores/app.store';

	/**
	 * @description
	 * If the app is loading.
	 */
	let loading: boolean = true;

	onMount(() => {
		appStore.subscribe((state) => {
			if (state.loaded) {
				loading = false;
				console.log('app loaded');
			}
		});
	});
</script>

<div class="loader">
	{#if loading}
		<div class="loader__content">
			<div class="logo" in:fly={{ y: 5, duration: 500 }}>
				<img src="./images/logo.png" alt="Clave Logo" />
			</div>

			<div class="loading" in:fly={{ y: 5, duration: 500, delay: 100 }}></div>
		</div>
	{:else}
		<slot />
	{/if}
</div>

<style lang="scss">
	.loader {
		width: 100%;
		height: 100%;

		&__content {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			height: 100%;

			.logo {
				width: 100px;
				margin-top: -100px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.loading {
				width: fit-content;

				font-size: 18px;
				font-family: monospace;
				font-weight: var(--font-weight-bold);

				background-clip: text;
				animation: l8 2s infinite steps(11);
				color: rgba(var(--color-primary-rgb), 0);

				background: linear-gradient(
						90deg,
						var(--color-primary) calc(50% - 0.5ch),
						hsl(var(--color-primary-hsl), 30%) 0 calc(50% + 0.5ch),
						var(--color-primary) 0
					)
					right/calc(200% + 1ch) 100%;
				-webkit-background-clip: text;

				&:before {
					content: 'Loading...';
					font-weight: var(--font-weight-bold);
				}

				@keyframes l8 {
					to {
						background-position: left;
					}
				}
			}
		}
	}
</style>
