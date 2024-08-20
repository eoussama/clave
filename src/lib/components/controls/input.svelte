<script lang="ts">
	import { EnumHelper } from '@eoussama/firemitt';

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
	 * The input type as text
	 */
	const getType = (): string => EnumHelper.getName(InputType, type).toLowerCase();
</script>

<label class="input">
	<input
		type={getType()}
		placeholder={label}
		class="input__input"
		autocorrect="off"
		autocapitalize="off"
	/>
</label>

<style lang="scss">
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

			outline-color: transparent;
			border: 1px solid var(--input-border-color);

			transition-duration: 0.2s;
			transition-property: border-color outline-offset;

			&::placeholder {
				color: var(--input-label-color);
				font-weight: var(--font-weight-light);
			}

			&:focus {
				--input-border-color: hsl(var(--color-primary-hsl), 70%);

				outline-offset: 1px;
				outline: 1px solid var(--input-border-color);
			}
		}
	}
</style>
