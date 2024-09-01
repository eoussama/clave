<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import { EnumHelper } from '@eoussama/firemitt';

	import { InputType } from '$lib/core/enums/input-type.enum';
	import type { TNullable } from '$lib/core/types/nullable.type';

	/**
	 * @description
	 * The input label
	 */
	export let label: string = '';

	/**
	 * @description
	 * The input value
	 */
	export let value: string = '';

	/**
	 * @description
	 * The input type
	 */
	export let type: InputType = InputType.Text;

	/**
	 * @description
	 * The input name
	 */
	export let name: TNullable<string>;

	/**
	 * @description
	 * The input rows
	 */
	export let rows: number = 4;

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
	 * If the input is readonly
	 */
	export let readonly: boolean = false;

	/**
	 * @description
	 * The input type as text
	 */
	const getType = (): string => EnumHelper.getName(InputType, type).toLowerCase();

	/**
	 * @description
	 * Gets the input type css class
	 */
	const getClasses = (): string => ['input', `input--${getType()}`].join(' ');

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
	const onKeyUp = (e: KeyboardEvent) => {
		if (!disabled && !readonly) {
			dispatch('keyup', e.key.toLowerCase());
		}
	};

	/***
	 * @description
	 * Sets the input type
	 */
	const typeAction = (node: HTMLInputElement) => {
		node.type = getType();
	};
</script>

<span
	class={getClasses()}
	class:input--error={error}
	class:input--disabled={disabled}
	class:input--readonly={readonly}
>
	{#if type === InputType.Editor}
		<textarea
			{rows}
			{name}
			bind:value
			autocorrect="off"
			autocapitalize="off"
			class="input__input"
			placeholder={label}
			disabled={disabled || readonly}
			on:keyup={onKeyUp}
		></textarea>
	{:else}
		<input
			{name}
			bind:value
			use:typeAction
			autocorrect="off"
			placeholder={label}
			autocapitalize="off"
			class="input__input"
			disabled={disabled || readonly}
			on:keyup={onKeyUp}
		/>
	{/if}

	{#if errorMsg && error}
		<div class="input__error" transition:fly={{ x: 5, duration: 200 }}>{errorMsg}</div>
	{/if}
</span>

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

			width: 100%;
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

		&--editor {
			display: inline-block;

			#{$root}__input {
				resize: none;
			}
		}
	}
</style>
