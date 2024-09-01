<script lang="ts">
	import { createEventDispatcher } from 'svelte';
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
	 * The label of the button
	 */
	export let icon: TNullable<any> = null;

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

<div class="add" class:add--disabled={disabled}>
	<button class="add__box" on:click={onClick}>
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

	.add {
		$root: &;

		--add-label-color: var(--color-secondary);
		--add-bg-color: hsl(var(--color-primary-hsl), 92%);
		--add-border-color: hsl(var(--color-primary-hsl), 92%);

		z-index: 2;

		position: relative;
		border-radius: 5px;

		outline-offset: 0;
		outline: 1px solid transparent;

		transition-duration: 0.2s;
		transition-property: transform outline-offset;

		&__box {
			all: inherit;

			z-index: 2;
			cursor: pointer;

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
				var(--color-primary),
				hsl(var(--color-primary-hsl), 70%)
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

			&::before {
				z-index: 1;
				content: '';

				top: 0;
				left: 0;
				position: absolute;

				width: 100%;
				height: 100%;
				transform: translateX(100%);

				animation-duration: 1s;
				animation-name: highlight;
				animation-iteration-count: infinite;
				animation-timing-function: ease-in-out;

				background: linear-gradient(
					to left,
					transparent 0%,
					rgba(var(--color-secondary-rgb), 0.15) 40%,
					transparent 80%
				);

				@keyframes highlight {
					from {
						transform: translateX(-100%);
					}

					to {
						transform: translateX(100%);
					}
				}
			}

			@include focus(--add-border-color);
		}

		&:hover {
			transform: scale(1.005);

			outline-offset: 2px;
			outline-color: var(--color-primary);
		}
	}
</style>
