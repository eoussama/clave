<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { ripple as rippleDirective } from 'svelte-ripple-action';

	import type { TNullable } from '$lib/core/types/nullable.type';

	/**
	 * @description
	 * The label of the action
	 */
	export let label: string = 'Action';

	/**
	 * @description
	 * If the action is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * If the action has a shine effect
	 */
	export let shine: boolean = false;

	/**
	 * @description
	 * The label of the button
	 */
	export let icon: TNullable<any> = null;

	/**
	 * @description
	 * If the action has a ripple effect
	 */
	export let ripple: boolean = false;

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatcher = createEventDispatcher();

	/**
	 * @description
	 * Click handler
	 *
	 * @param e
	 */
	function onClick(e: MouseEvent) {
		dispatcher('click');
	}
</script>

<div class="add" class:add--disabled={disabled} class:add--shine={shine}>
	<button
		{disabled}
		class="add__box"
		on:click={onClick}
		use:rippleDirective={{ disabled: !ripple }}
	>
		<input class="add__message" type="text" placeholder={label} disabled />

		{#if icon}
			<div class="add__icon">
				<svelte:component this={icon} />
			</div>
		{/if}
	</button>
</div>

<style lang="scss">
	@import '../../../style/utils/focus';
	@import '../../../style/utils/shine';

	.add {
		$root: &;

		--add-label-color: var(--color-secondary);
		--add-bg-color-hsl: var(--color-primary-hsl);
		--add-border-color: hsl(var(--color-primary-hsl), 92%);

		z-index: 2;
		cursor: pointer;

		position: relative;
		border-radius: 5px;

		outline-offset: 0;
		outline: 1px solid transparent;

		transition-duration: 0.2s;
		transition-property: transform outline-offset;

		&__box {
			all: inherit;

			z-index: 2;

			z-index: 0;
			overflow: hidden;
			position: relative;

			width: 100%;
			height: 100%;
			display: block;
			user-select: none;

			border-radius: 5px;
			background: linear-gradient(
				to right,
				hsl(var(--add-bg-color-hsl), 55%),
				hsl(var(--add-bg-color-hsl), 70%)
			);

			#{$root}__icon,
			#{$root}__message {
				pointer-events: none;
			}

			#{$root}__message {
				width: 100%;
				padding: 15px;

				border: none;
				outline: none;
				background-color: transparent;

				font-size: 12px;
				text-transform: uppercase;

				font-weight: var(--font-weight-regular);
				font-family: var(--font-family-primary);

				&::placeholder {
					color: var(--add-label-color);
				}
			}

			#{$root}__icon {
				width: 24px;
				height: 24px;

				position: absolute;
				right: 6px;
				top: 50%;

				transform: translateY(-50%);
				color: var(--add-label-color);
			}

			@include focus(--add-border-color);
		}

		&--disabled {
			cursor: not-allowed;

			--add-bg-color-hsl: 0, 0%;
			--add-label-color: #b9b9b9;
			--add-border-color: #b9b9b9;

			#{$root}__box {
				cursor: not-allowed;

				background: #eeeeee;
			}
		}

		&--shine:not(&--disabled) {
			@include shine(--color-secondary-rgb);
		}

		&:not(&--disabled):hover {
			transform: scale(1.005);

			outline-offset: 2px;
			outline-color: var(--color-primary);
		}
	}
</style>
