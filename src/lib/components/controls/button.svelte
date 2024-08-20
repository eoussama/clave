<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FaCircleNotch from 'svelte-icons/fa/FaCircleNotch.svelte';

	import { ButtonType } from '$lib/core/enums/button-type.enum';
	import type { TNullable } from '$lib/core/types/nullable.type';
	import { EnumHelper } from '@eoussama/firemitt';

	/**
	 * @description
	 * The button type
	 */
	export let type: ButtonType = ButtonType.Default;

	/**
	 * @description
	 * If this is an icon only button
	 */
	export let iconOnly: boolean = false;

	/**
	 * @description
	 * If the button is disabled
	 */
	export let disabled: boolean = false;

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
	const onClick = (e: MouseEvent) => {
		if (!loading && !disabled) {
			dispatch('click', { e });
		}
	};

	/**
	 * @description
	 * Gets the type css class
	 */
	const getTypeClass = () => EnumHelper.getName(ButtonType, type).toLowerCase();

	/**
	 * @description
	 * Checks if the button has an icon
	 */
	const hasIcon = () => loading || icon;

	/**
	 * @description
	 * Computed classes
	 */
	$: classes = `btn btn--${getTypeClass()}`;
</script>

<button
	class={classes}
	class:btn--icon={iconOnly}
	class:btn--loading={loading}
	class:btn--disabled={disabled}
	disabled={disabled || loading}
	on:click={onClick}
>
	<!-- {#if icon}
		<div class="btn__icon">
			{#if loading}
				<FaCircleNotch />
			{:else}
				<svelte:component this={icon} />
			{/if}
		</div>
	{/if} -->

	{#if hasIcon()}
		<div class="btn__icon">
			{#if loading}
				<FaCircleNotch />
			<!-- {:else}
				<svelte:component this={icon} /> -->
			{/if}
		</div>
	{/if}

	<span class="btn__label">
		{loading ? loadingLabel ?? label : label}
	</span>
</button>

<style lang="scss">
	.btn {
		$root: &;

		--button-bg-color: transparent;
		--button-text-color: hsl(var(--color-primary-hsl), 70%);
		--button-border-color: hsl(var(--color-primary-hsl), 80%);

		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		padding: 8px 10px;
		border-radius: 4px;

		color: var(--button-text-color);
		background-color: var(--button-bg-color);
		border: 1px solid var(--button-border-color);

		transition-duration: 0.2s;
		transition-property: background-color;

		&__label {
			font-family: var(--font-family-primary);
			font-weight: var(--font-weight-regular);
		}

		&__icon {
			display: flex;

			width: 16px;
			margin-right: 8px;
		}

		&:disabled {
			cursor: not-allowed;

			--button-text-color: #b9b9b9;
			--button-bg-color: transparent;
			--button-border-color: #eeeeee;
		}

		&:hover:not(:disabled) {
			--button-bg-color: hsl(var(--color-primary-hsl), 96%);
		}

		&--primary {
			--button-text-color: var(--color-primary);
			--button-bg-color: hsl(var(--color-primary-hsl), 92%);
			--button-border-color: hsl(var(--color-primary-hsl), 92%);

			&:disabled {
				--button-text-color: #b9b9b9;
				--button-bg-color: whitesmoke;
				--button-border-color: whitesmoke;
			}

			&:hover:not(:disabled) {
				--button-bg-color: hsl(var(--color-primary-hsl), 85%);
			}
		}

		&--secondary {
			--button-text-color: var(--color-secondary);
			--button-bg-color: hsl(var(--color-secondary-hsl), 42%);
			--button-border-color: hsl(var(--color-secondary-hsl), 42%);

			&:disabled {
				--button-text-color: #b9b9b9;
				--button-bg-color: whitesmoke;
				--button-border-color: whitesmoke;
			}

			&:hover:not(:disabled) {
				--button-bg-color: hsl(var(--color-secondary-hsl), 44%);
			}
		}

		&--loading {
			cursor: wait !important;

			#{$root}__icon {
				animation-duration: 1s;
				animation-name: loader-spin;
				animation-fill-mode: forwards;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}
		}

		// &--icon {
		// 	border: none;
		// 	padding: 5px;

		// 	--button-text-color: var(--color-primary);
		// 	--button-bg-color: hsl(var(--color-secondary-hsl), 95%);

		// 	#{$root}__icon {
		// 		margin-right: 0;
		// 	}

		// 	&:hover:not(:disabled) {
		// 		--button-bg-color: hsl(var(--color-secondary-hsl), 80%);
		// 	}

		// 	&.btn--primary {
		// 		--button-bg-color: hsl(var(--color-primary-hsl), 88%);

		// 		&:hover:not(:disabled) {
		// 			--button-bg-color: hsl(var(--color-primary-hsl), 84%);
		// 		}
		// 	}
		// }

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
