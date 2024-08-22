<script lang="ts">
	import type { TOption } from '$lib/core/types/option.type';
	import { fly } from 'svelte/transition';

	/**
	 * @description
	 * The dropdown label
	 */
	export let label: string = '';

	/**
	 * @description
	 * The dropdown value
	 */
	export let value: string = '';

	/**
	 * @description
	 * The dropdown options
	 */
	export let options: Array<TOption> = [];

	/**
	 * @description
	 * If the dropdown is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * If the dropdown is readonly
	 */
	export let readonly: boolean = false;

	/**
	 * @description
	 * If the dropdown is in error state
	 */
	export let error: boolean = false;

	/**
	 * @description
	 * The error message
	 */
	export let errorMsg: string = '';
</script>

<div
	class="dropdown"
	class:dropdown--error={error}
	class:dropdown--disabled={disabled}
	class:dropdown--readonly={readonly}
>
	<select {value} class="dropdown__select" disabled={disabled || readonly}>
		<option class="dropdown__label" value="">
			{label}
		</option>

		{#each options as option}
			<option class="dropdown__value" value={option.value}>
				{option.label}
			</option>
		{/each}
	</select>

	{#if errorMsg && error}
		<div class="dropdown__error" transition:fly={{ x: 5, duration: 200 }}>{errorMsg}</div>
	{/if}
</div>

<style lang="scss">
	@import '../../../style/utils/focus';

	.dropdown {
		$root: &;

		--dropdown-value-color: var(--color-primary);
		--dropdown-bg-color: hsl(var(--color-primary-hsl), 95%);
		--dropdown-label-color: hsl(var(--color-primary-hsl), 70%);
		--dropdown-border-color: hsl(var(--color-primary-hsl), 93%);

		display: inline;

		&__select {
			cursor: pointer;

			max-height: 37px;

			border: none;
			padding: 7px 6px;
			border-radius: 4px;

			font-size: 14px;
			font-weight: var(--font-weight-light);
			font-family: var(--font-family-primary);

			color: var(--dropdown-label-color);
			background-color: var(--dropdown-bg-color);
			border: 1px solid var(--dropdown-border-color);

			transition-duration: 0.2s;
			transition-property: border-color;

			#{$root}__value {
				color: var(--dropdown-value-color);
			}

			&:disabled {
				opacity: 1;
			}

			@include focus(--dropdown-border-color);
		}

		&__error {
			padding: 0 5px;
			margin-top: 2px;

			font-size: 12px;
			color: var(--color-failure);
		}

		&--readonly #{$root}__select {
			cursor: default;
		}

		&--disabled {
			--dropdown-bg-color: #eeeeee;
			--dropdown-label-color: #b9b9b9;
			--dropdown-value-color: #b9b9b9;
			--dropdown-border-color: #eeeeee;

			#{$root}__select {
				cursor: not-allowed;
			}

			#{$root}__error {
				display: none;
			}
		}

		&--error {
			--dropdown-value-color: var(--color-failure);
			--dropdown-bg-color: hsl(var(--color-failure-hsl), 95%);
			--dropdown-label-color: hsl(var(--color-failure-hsl), 70%);
			--dropdown-border-color: hsl(var(--color-failure-hsl), 93%);
		}
	}
</style>
