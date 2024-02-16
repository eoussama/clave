<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TNullable } from '$lib/core/types/nullable.type';

	/**
	 * @description
	 * If the button is primary
	 */
	export let primary: boolean = false;

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

<button class="btn" class:btn--primary={primary} on:click={onClick}>
	{#if icon}
		<div class="btn__icon">
			<svelte:component this={icon} />
		</div>
	{/if}

	<div class="control__label">{label}</div>
</button>

<style lang="scss">
	.btn {
		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		margin: auto;
		padding: 10px;

		width: 100%;
		max-width: 250px;

		border-radius: 5px;
		color: var(--color-primary);
		border: 1px solid var(--color-primary);
		background-color: var(--color-secondary);

		font-family: var(--font-primary);
		font-weight: var(--font-weight-regular);

		transition-duration: 0.2s;
		transition-property: background-color;

		&:hover {
			background-color: hsl(var(--color-secondary-hsl), 85%);
		}

		&__icon {
			display: flex;

			width: 16px;
			margin-right: 12px;
		}

		&--primary {
			border: none;
			color: var(--color-secondary);
			background-color: hsl(var(--color-primary-hsl), 55%);

			&:hover {
				background-color: hsl(var(--color-primary-hsl), 45%);
			}
		}
	}
</style>
