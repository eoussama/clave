<script lang="ts">
	import type { TNullable } from '$lib/core/types/nullable.type';
	import { createEventDispatcher } from 'svelte';

	/**
	 * @description
	 * The value of the toggle input
	 */
	export let value: boolean = false;

	/**
	 * @description
	 * The label of the toggle input
	 */
	export let label: TNullable<string>;

	/**
	 * @description
	 * If the toggle is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * If the toggle is readonly
	 */
	export let readonly: boolean = false;

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatch = createEventDispatcher();

	/**
	 * @description
	 * Click handler
	 */
	const onClick = () => {
		value = !value;
		dispatch('check', { value });
	};
</script>

<div class="check" class:check--disabled={disabled} class:check--readonly={readonly}>
	{#if label}
		<span class="check__label">{label}</span>
	{/if}

	<button class="check__button" type="button" disabled={disabled || readonly} on:click={onClick}>
		<div class="check__lobe" class:check__mark--on={value}></div>
	</button>
</div>

<style lang="scss">
	@import '../../../style/utils/focus';

	.check {
		$root: &;

		--mark-bg-color: transparent;
		--mark-lobe-color: hsl(var(--color-primary-hsl), 80%);
		--mark-label-color: hsl(var(--color-primary-hsl), 70%);
		--mark-border-color: hsl(var(--color-primary-hsl), 80%);

		display: inline-flex;

		&__label {
			// flex: 1;
			// margin-right: 5px;

			// color: var(--toggle-label-color);
			// font-weight: var(--font-weight-light);
		}

		&__button {
			// cursor: pointer;

			// width: 40px;
			// height: 22px;
			// background-color: var(--toggle-bg-color);

			// border: none;
			// border-radius: 50px;
			// border: 1px solid var(--toggle-border-color);

			// transition-duration: 0.2s;
			// transition-property: background-color;

			// #{$root}__mark {
			// 	width: 18px;
			// 	height: 100%;

			// 	top: 0;
			// 	left: -4px;
			// 	position: relative;

			// 	border-radius: 50%;
			// 	background-color: var(--toggle-lobe-color);

			// 	transition-duration: 0.2s;
			// 	transition-property: left width;

			// 	&--on {
			// 		left: calc(100% - 18px + 4px);
			// 		--toggle-lobe-color: var(--color-primary);
			// 	}
			// }

			// &:hover:not(:disabled) {
			// 	--toggle-bg-color: hsl(var(--color-primary-hsl), 95%);
			// 	--toggle-border-color: hsl(var(--color-primary-hsl), 75%);

			// 	&:active {
			// 		#{$root}__mark {
			// 			width: 22px;

			// 			&--on {
			// 				left: calc(100% - 22px + 4px);
			// 			}
			// 		}
			// 	}
			// }

			@include focus(--toggle-label-color);
		}

		// &--readonly {
		// 	#{$root}__button {
		// 		cursor: default;
		// 	}
		// }

		// &--disabled {
		// 	--toggle-bg-color: #eeeeee;
		// 	--toggle-label-color: #b9b9b9;
		// 	--toggle-lobe-color: #b9b9b9;
		// 	--toggle-border-color: #eeeeee;

		// 	#{$root}__button {
		// 		cursor: not-allowed;
		// 	}
		// }
	}
</style>
