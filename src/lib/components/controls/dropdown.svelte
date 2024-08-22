<script lang="ts">
	import type { TOption } from '$lib/core/types/option.type';

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

<select
	{value}
	class="dropdown"
	disabled={disabled || readonly}
	class:dropdown--error={error}
	class:dropdown--disabled={disabled}
	class:dropdown--readonly={readonly}
>
	<option value="">{label}</option>

	{#each options as option}
		<option value={option.value}>
			{option.label}
		</option>
	{/each}
</select>

<style lang="scss">
	@import '../../../style/utils/focus';

	.dropdown {
		$root: &;

		--dropdown-bg-color: hsl(var(--color-primary-hsl), 95%);
		--dropdown-text-color: hsl(var(--color-primary-hsl), 70%);
		--dropdown-border-color: hsl(var(--color-primary-hsl), 93%);

		cursor: pointer;

		border: none;
		padding: 8px 10px;
		border-radius: 4px;

		font-size: 14px;
		font-weight: var(--font-weight-regular);
		font-family: var(--font-family-primary);

		color: var(--dropdown-text-color);
		background-color: var(--dropdown-bg-color);

		border: 1px solid var(--dropdown-border-color);

		transition-duration: 0.2s;
		transition-property: border-color;

		@include focus(--dropdown-border-color);
	}
</style>
