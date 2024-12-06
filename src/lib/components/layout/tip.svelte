<script lang="ts">
	import { fly } from 'svelte/transition';

	import { EnumHelper } from '@eoussama/firemitt';

	import { TipPositiion } from '$lib/core/enums/tip-position.enum';

	/**
	 * @description
	 * The text to display
	 */
	export let message: string;

	/**
	 * @description
	 * If the tip is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * The tip position
	 */
	export let position: TipPositiion = TipPositiion.Top;

	/**
	 * @description
	 * If the tip element is hovered
	 */
	let hovered: boolean = false;

	/**
	 * @description
	 * If the tip has a message
	 */
	const hasMessage = () => Boolean(message) && message.length > 0;

	/**
	 * @decription
	 * Gets the position css class
	 */
	const getPositionClass = () => EnumHelper.getName(TipPositiion, position).toLowerCase();

	/**
	 * @decription
	 * Gets the transition related to the tip's position
	 */
	const getTransition = () => {
		const value = 5;

		switch (position) {
			case TipPositiion.Left:
				return { x: value };

			case TipPositiion.Right:
				return { x: -value };

			case TipPositiion.Top:
				return { y: value };

			case TipPositiion.Bottom:
				return { y: -value };

			case TipPositiion.TopLeft:
				return { x: value, y: value };

			case TipPositiion.TopRight:
				return { x: -value, y: value };

			case TipPositiion.BottomLeft:
				return { x: value, y: -value };

			case TipPositiion.BottomRight:
				return { x: -value, y: -value };

			default:
				return { x: value };
		}
	};

	/**
	 * @description
	 * Mouse enter event
	 */
	const onMouseEnter = () => {
		hovered = true;
	};

	/**
	 * @description
	 * Mouse leave event
	 */
	const onMouseLeave = () => {
		hovered = false;
	};

	/**
	 * @description
	 * Computed classes
	 */
	$: classes = `tip tip--${getPositionClass()}`;
</script>

<span class={classes} class:tip--disabled={disabled}>
	<span
		role="tooltip"
		class="tip__element"
		on:mouseenter={onMouseEnter}
		on:mouseleave={onMouseLeave}
	>
		<slot />
	</span>

	{#if hasMessage() && hovered && !disabled}
		<div class="tip__box" transition:fly={{ ...getTransition(), duration: 200 }}>
			<p class="tip__message">{message}</p>
		</div>
	{/if}
</span>

<style lang="scss">
	.tip {
		$root: &;

		--tip-bg-color: hsl(var(--color-secondary-hsl), 95%);
		--tip-text-color: hsl(var(--color-primary-hsl), 70%);

		position: relative;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		&__element {
			cursor: help;

			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		&__box {
			z-index: 1;
			position: absolute;

			max-width: 200px;
			width: max-content;

			padding: 4px;
			border-radius: 4px;
			box-shadow: 1px 1px 2px 0 rgba(var(--color-primary-rgb), 0.2);

			color: var(--tip-text-color);
			background-color: var(--tip-bg-color);

			#{$root}__message {
				margin: 0;
				padding: 0;

				font-size: 12px;
				font-weight: var(--font-weight-light);
			}
		}

		&--left &__box {
			bottom: 50%;
			right: calc(100% + 5px);
			transform: translateY(50%);
		}

		&--right &__box {
			bottom: 50%;
			left: calc(100% + 5px);
			transform: translateY(50%);
		}

		&--top &__box {
			left: 50%;
			bottom: calc(100% + 5px);
			transform: translateX(-50%);
		}

		&--bottom &__box {
			left: 50%;
			top: calc(100% + 5px);
			transform: translateX(-50%);
		}

		&--topleft &__box {
			left: 0;
			bottom: calc(100% + 5px);
		}

		&--topright &__box {
			right: 0;
			bottom: calc(100% + 5px);
		}

		&--bottomleft &__box {
			left: 0;
			top: calc(100% + 5px);
		}

		&--bottomright &__box {
			right: 0;
			top: calc(100% + 5px);
		}

		&--disabled &__element {
			cursor: default;
		}
	}
</style>
