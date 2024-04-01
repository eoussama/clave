<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FaCircleNotch from 'svelte-icons/fa/FaCircleNotch.svelte';

	import type { TNullable } from '$lib/core/types/nullable.type';

	/**
	 * @description
	 * If the button is primary
	 */
	export let primary: boolean = false;

	/**
	 * @description
	 * If this is an icon only button
	 */
	export let iconOnly: boolean = false;

	/**
	 * @description
	 * The label of the button
	 */
	export let label: string = 'Click Me!';

	/**
	 * @description
	 * The label of the button
	 */
	export let icon: TNullable<any> = null;

	/**
	 * @description
	 * The loading state of the button
	 */
	export let loading: boolean = false;

	/**
	 * @description
	 * The label of the button when the loader is active
	 */
	export let loadingLabel: TNullable<string> = null;

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatch = createEventDispatcher();

	/**
	 * @description
	 * Button click event
	 *
	 * @param e Event object
	 */
	const onClick = (e: MouseEvent) => dispatch('click', { e });
</script>

<button
	class="btn"
	disabled={loading}
	class:btn--icon={iconOnly}
	class:btn--loading={loading}
	class:btn--primary={primary}
	on:click={onClick}
>
	{#if icon}
		<div class="btn__icon">
			{#if loading}
				<FaCircleNotch />
			{:else}
				<svelte:component this={icon} />
			{/if}
		</div>
	{/if}

	{#if !iconOnly}
		<div class="btn__label">{loading ? loadingLabel ?? label : label}</div>
	{/if}
</button>

<style lang="scss">
	.btn {
		$root: &;

		--button-bg-color: transparent;
		--button-text-color: var(--color-primary);
		--button-border-color: rgba(var(--color-primary-rgb), 0.3);

		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		margin: auto;
		padding: 10px;

		max-width: 250px;
		border-radius: 5px;

		color: var(--button-text-color);
		background-color: var(--button-bg-color);
		border: 1px solid var(--button-border-color);

		font-family: var(--font-family-primary);
		font-weight: var(--font-weight-regular);

		transition-duration: 0.2s;
		transition-property: background-color;

		&__icon {
			display: flex;

			width: 16px;
			margin-right: 12px;
		}

		&:disabled {
			cursor: wait;
			opacity: 0.8;
		}

		&:hover {
			&:not(:disabled) {
				--button-bg-color: hsl(var(--color-primary-hsl), 96%);
			}
		}

		&--primary {
			border: none;

			--button-text-color: var(--color-primary);
			--button-bg-color: hsl(var(--color-primary-hsl), 90%);

			&:hover:not(:disabled) {
				--button-bg-color: hsl(var(--color-primary-hsl), 85%);
			}
		}

		&--loading {
			#{$root}__icon {
				animation-duration: 1s;
				animation-name: loader-spin;
				animation-fill-mode: forwards;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}
		}

		&--icon {
			border: none;
			padding: 5px;

			--button-text-color: var(--color-primary);
			--button-bg-color: hsl(var(--color-secondary-hsl), 95%);

			#{$root}__icon {
				margin-right: 0;
			}

			&:hover:not(:disabled) {
				--button-bg-color: hsl(var(--color-secondary-hsl), 80%);
			}

			&.btn--primary {
				--button-bg-color: hsl(var(--color-primary-hsl), 88%);

				&:hover:not(:disabled) {
					--button-bg-color: hsl(var(--color-primary-hsl), 84%);
				}
			}
		}

		@keyframes loader-spin {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(360deg);
			}
		}
	}
</style>
