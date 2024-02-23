<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { appStore } from '$lib/core/stores/app.store';
</script>

<div class="loader">
	{#if $appStore.loading}
		<div class="loader__content" in:fade={{ duration: 500 }}>
			<div class="logo" in:fly={{ y: 5, duration: 500 }}>
				<img src="./images/logo.png" alt="Clave Logo" />
			</div>

			<div class="loading" in:fly={{ y: 5, duration: 500, delay: 100 }}></div>
		</div>
	{:else}
		<div class="loader__slot" in:fade={{ duration: 500 }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.loader {
		width: 100%;
		height: 100%;

		&__slot {
			display: inline;
		}

		&__content {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			height: 100%;

			--s: 60px;
			--c1: #ffffff;
			--c2: hsl(var(--color-primary-hsl), 98%);

			background:
				repeating-conic-gradient(var(--c1) 0 25%, #0000 0 50%) 0 0 / calc(4 * var(--s))
					calc(2 * var(--s)),
				conic-gradient(#0000 50%, var(--c2) 0) calc(var(--s) / 2) 0 / calc(2 * var(--s)) 1%,
				radial-gradient(var(--c2) 70%, var(--c1) 72%) 0 0 / var(--s) var(--s);

			animation-name: background-scroll;
			animation-duration: 10s;
			animation-fill-mode: both;
			animation-direction: normal;
			animation-timing-function: linear;
			animation-iteration-count: infinite;

			@keyframes background-scroll {
				from {
					background-position: 0;
				}

				to {
					background-position: 240px;
				}
			}

			.logo {
				width: 100px;
				margin-top: -100px;

				img {
					width: 100%;
					height: 100%;

					filter: drop-shadow(0 0 40px rgba(var(--color-primary-rgb), 0.5));
				}
			}

			.loading {
				margin-top: 5px;
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
