<script lang="ts">
	import { fly } from 'svelte/transition';

	import { EnumHelper, type TNullable } from '@eoussama/firemitt';

	import { InputType } from '$lib/core/enums/input-type.enum';

	/**
	 * @description
	 * The input label
	 */
	export let label: string = '';

	/**
	 * @description
	 * The input type
	 */
	export let type: InputType = InputType.Text;

	/**
	 * @description
	 * If the input is in error state
	 */
	export let error: boolean = false;

	/**
	 * @description
	 * The error message
	 */
	export let errorMsg: TNullable<string>;

	/**
	 * @description
	 * If the input is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * The input type as text
	 */
	const getType = (): string => EnumHelper.getName(InputType, type).toLowerCase();
</script>

<label class="input" class:input--error={error} class:input--disabled={disabled}>
	<input
		{disabled}
		type={getType()}
		placeholder={label}
		class="input__input"
		autocorrect="off"
		autocapitalize="off"
	/>

	{#if errorMsg && error}
		<div class="input__error" transition:fly={{ x: 5, duration: 200 }}>{errorMsg}</div>
	{/if}
</label>

<style lang="scss">
	@import '../../../style/utils/focus';

	.input {
		$root: &;

		--input-value-color: var(--color-primary);
		--input-bg-color: hsl(var(--color-primary-hsl), 95%);
		--input-label-color: hsl(var(--color-primary-hsl), 70%);
		--input-border-color: hsl(var(--color-primary-hsl), 93%);

		cursor: text;

		&__input {
			border: none;
			padding: 8px 10px;
			border-radius: 4px;

			font-size: 14px;
			font-weight: var(--font-weight-regular);
			font-family: var(--font-family-primary);

			color: var(--input-value-color);
			background-color: var(--input-bg-color);

			border: 1px solid var(--input-border-color);

			transition-duration: 0.2s;
			transition-property: border-color;

			&::placeholder {
				color: var(--input-label-color);
				font-weight: var(--font-weight-light);
			}

			@include focus(--input-border-color);
		}

		&__error {
			padding: 0 5px;
			margin-top: 2px;

			font-size: 12px;
			color: var(--color-failure);
		}

		&--error {
			--input-value-color: var(--color-failure);
			--input-bg-color: hsl(var(--color-failure-hsl), 95%);
			--input-label-color: hsl(var(--color-failure-hsl), 70%);
			--input-border-color: hsl(var(--color-failure-hsl), 93%);
		}

		&--disabled {
			--input-value-color: #b9b9b9;
			--input-bg-color: #eeeeee;
			--input-label-color: #b9b9b9;
			--input-border-color: #eeeeee;

			#{$root}__input {
				cursor: not-allowed;
			}

			#{$root}__error {
				display: none;
			}
		}
	}
</style>
