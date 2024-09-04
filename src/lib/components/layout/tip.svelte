<script lang="ts">
	import { fly } from 'svelte/transition';

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
	 * If the tip element is hovered
	 */
	let hovered: boolean = false;

	/**
	 * @description
	 * If the tip has a message
	 */
	const hasMessage = () => Boolean(message) && message.length > 0;

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
</script>

<span class="tip" class:tip--disabled={disabled}>
	<span
		role="tooltip"
		class="tip__element"
		on:mouseenter={onMouseEnter}
		on:mouseleave={onMouseLeave}
	>
		<slot />
	</span>

	{#if hasMessage() && hovered && !disabled}
		<div class="tip__box" transition:fly={{ x: -5, duration: 200 }}>
			<p class="tip__message">{message}</p>
		</div>
	{/if}
</span>

<style lang="scss">
	.tip {
		$root: &;

		--tip-bg-color: hsl(var(--color-primary-hsl), 95%);
		--tip-text-color: hsl(var(--color-primary-hsl), 70%);

		position: relative;
		display: inline-block;

		&__element {
			cursor: help;
		}

		&__box {
			position: absolute;
			left: 0;
			top: calc(100% + 5px);

			max-width: 200px;
			width: max-content;

			padding: 8px 10px;
			border-radius: 4px;
			box-shadow: 1px 1px 2px 0 rgba(var(--color-primary-rgb), 0.2);

			color: var(--tip-text-color);
			background-color: var(--tip-bg-color);

			#{$root}__message {
				margin: 0;
				padding: 0;
				font-weight: var(--font-weight-light);
			}
		}

		&--disabled &__element {
			cursor: default;
		}
	}
</style>
