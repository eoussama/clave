<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import { ripple as rippleDirective } from 'svelte-ripple-action';

	import MdCheck from 'svelte-icons/md/MdCheck.svelte';

	import type { TNullable } from '$lib/core/types/nullable.type';

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
	 * If the toggle has a ripple effect
	 */
	export let ripple: boolean = false;

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

<div
	class="check"
	class:check--on={value}
	class:check--disabled={disabled}
	class:check--readonly={readonly}
>
	{#if label}
		<span class="check__label">{label}</span>
	{/if}

	<button
		type="button"
		class="check__button"
		disabled={disabled || readonly}
		on:click={onClick}
		use:rippleDirective={{ disabled: !ripple || disabled }}
	>
		<div class="check__mark">
			{#if value}
				<div transition:fly={{ x: 5, duration: 200 }}>
					<MdCheck />
				</div>
			{/if}
		</div>
	</button>
</div>

<style lang="scss">
	@import '../../../style/utils/focus';

	.check {
		$root: &;

		--check-bg-color: transparent;
		--check-mark-color: hsl(var(--color-primary-hsl), 80%);
		--check-label-color: hsl(var(--color-primary-hsl), 70%);
		--check-border-color: hsl(var(--color-primary-hsl), 80%);

		display: inline-flex;

		&__label {
			flex: 1;
			margin-right: 5px;

			color: var(--check-label-color);
			font-weight: var(--font-weight-light);
		}

		&__button {
			cursor: pointer;
			position: relative;

			width: 22px;
			height: 22px;
			background-color: var(--check-bg-color);

			border: none;
			border-radius: 4px;
			border: 1px solid var(--check-border-color);

			transition-duration: 0.2s;
			transition-property: background-color border-color;

			#{$root}__mark {
				width: 16px;
				height: 16px;

				top: 0;
				left: -50%;
				position: relative;

				color: var(--check-mark-color);

				transition-duration: 0.2s;
				transition-property: opacity color;
			}

			&:hover:not(:disabled) {
				--check-bg-color: hsl(var(--color-primary-hsl), 95%);
				--check-border-color: hsl(var(--color-primary-hsl), 75%);
			}

			@include focus(--check-label-color);
		}

		&--on {
			--check-mark-color: #ffffff;
			--check-bg-color: var(--color-primary);

			#{$root}__mark {
				opacity: 1;
			}

			&:hover:not(:disabled) {
				#{$root}__button {
					--check-bg-color: hsl(var(--color-primary-hsl), 45%);
					--check-border-color: hsl(var(--color-primary-hsl), 50%);
				}
			}
		}

		&--readonly {
			#{$root}__button {
				cursor: default;
			}
		}

		&--disabled {
			--check-bg-color: #eeeeee;
			--check-label-color: #b9b9b9;
			--check-mark-color: #b9b9b9;
			--check-border-color: #eeeeee;

			#{$root}__button {
				cursor: not-allowed;
			}
		}
	}
</style>
