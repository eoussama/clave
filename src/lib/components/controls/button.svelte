<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { onMount, createEventDispatcher } from 'svelte';

	import FaCircleNotch from 'svelte-icons/fa/FaCircleNotch.svelte';

	import { EnumHelper } from '@eoussama/firemitt';
	import { ripple as rippleDirective } from 'svelte-ripple-action';

	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { ButtonType } from '$lib/core/enums/button-type.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';

	import type { TNullable } from '$lib/core/types/nullable.type';

	/**
	 * @description
	 * The button style
	 */
	export let style: ButtonStyle = ButtonStyle.Default;

	/**
	 * @description
	 * The button size
	 */
	export let size: ButtonSize = ButtonSize.Default;

	/**
	 * @description
	 * The button type
	 */
	export let type: ButtonType = ButtonType.Button;

	/**
	 * @description
	 * If the button is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * The label of the button
	 */
	export let label: TNullable<string>;

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
	 * If the button has a shine effect
	 */
	export let shine: boolean = false;

	/**
	 * @description
	 * If the button has a ripple effect
	 */
	export let ripple: boolean = false;

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
	 * Gets the style css class
	 */
	const getStyleClass = () => EnumHelper.getName(ButtonStyle, style).toLowerCase();

	/**
	 * @description
	 * Gets the size css class
	 */
	const getSizeClass = () => EnumHelper.getName(ButtonSize, size).toLowerCase();

	/**
	 * @description
	 * Gets the type name
	 */
	const getType = () => EnumHelper.getName(ButtonType, type).toLowerCase();

	/**
	 * @description
	 * Gets the loading label
	 */
	const getLoadingLabel = () => (loadingLabel && loadingLabel?.length > 0 ? loadingLabel : label);

	/**
	 * @description
	 * Checks if the button has an icon
	 */
	const hasIcon = () => loading || icon;

	/**
	 * @description
	 * Checks if the button is icon only
	 */
	const isIconOnly = () => !label && icon;

	/**
	 * @description
	 * The icon flip transition
	 */
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	});

	/**
	 * @description
	 * Computed classes
	 */
	$: classes = `btn btn--${getStyleClass()} btn--${getSizeClass()}`;

	onMount(async () => {
		if (!icon && !label) {
			label = 'Click Me!';
		}
	});
</script>

<button
	class={classes}
	class:btn--shine={shine}
	class:btn--loading={loading}
	class:btn--disabled={disabled}
	class:btn--icon={isIconOnly()}
	type={getType()}
	disabled={disabled || loading}
	use:rippleDirective={{ disabled: !ripple || disabled || loading }}
	on:click={onClick}
>
	{#if hasIcon()}
		<div class="btn__icon">
			{#if loading}
				<span
					class="btn__icon-wrapper"
					out:send={{ key: 'iconFlip', duration: 200 }}
					in:receive={{ key: 'iconFlip', duration: 200 }}
				>
				</span>
				<FaCircleNotch />
			{:else}
				<span
					class="btn__icon-wrapper"
					out:send={{ key: 'iconFlip', duration: 200 }}
					in:receive={{ key: 'iconFlip', duration: 200 }}
				>
					<svelte:component this={icon} />
				</span>
			{/if}
		</div>
	{/if}

	{#if label}
		<span class="btn__label">
			{loading ? getLoadingLabel() : label}
		</span>
	{/if}
</button>

<style lang="scss">
	@import '../../../style/utils/focus';
	@import '../../../style/utils/shine';

	.btn {
		$root: &;

		--button-shine-alpha: 0.1;
		--button-bg-color: transparent;
		--button-shine-color: var(--color-primary-rgb);
		--button-text-color: hsl(var(--color-primary-hsl), 70%);
		--button-border-color: hsl(var(--color-primary-hsl), 80%);

		cursor: pointer;

		position: relative;
		overflow: hidden;

		display: inline-flex;
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

			&-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;
			}
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
				--button-bg-color: #eeeeee;
				--button-border-color: #eeeeee;
			}

			&:hover:not(:disabled) {
				--button-bg-color: hsl(var(--color-primary-hsl), 85%);
			}
		}

		&--secondary {
			--button-shine-alpha: 0.2;
			--button-text-color: var(--color-secondary);
			--button-shine-color: var(--color-secondary-rgb);
			--button-bg-color: hsl(var(--color-secondary-hsl), 42%);
			--button-border-color: hsl(var(--color-secondary-hsl), 42%);

			&:disabled {
				--button-text-color: #b9b9b9;
				--button-bg-color: #eeeeee;
				--button-border-color: #eeeeee;
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

		&--icon {
			#{$root}__icon {
				margin-right: 0;
			}
		}

		&--small {
			padding: 4px;

			#{$root}__label {
				font-size: 12px;
			}

			#{$root}__icon {
				width: 14px;
			}
		}

		&--shine:not(&--disabled, &--loading) {
			@include shine(--button-shine-color, var(--button-shine-alpha));
		}

		@include focus(--button-border-color);

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
