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
	<input class="input__input" type={getType()} placeholder={label} />
</label>

<style lang="scss">
	.input {
		$root: &;

		--input-bg-color: transparent;
		--input-value-color: var(--color-primary);
		--input-label-color: hsl(var(--color-primary-hsl), 70%);
		--input-border-color: hsl(var(--color-primary-hsl), 80%);

		&__input {
			border: none;
			padding: 8px 10px;
			border-radius: 4px;

			// width: 100%;
			// height: 100%;

			font-size: 14px;
			font-weight: var(--font-weight-regular);
			font-family: var(--font-family-primary);

			color: var(--input-value-color);
			background-color: var(--input-bg-color);
			border: 1px solid var(--input-border-color);

			&::placeholder {
				color: var(--input-label-color);
				font-weight: var(--font-weight-light);
			}

			&:focus {
				outline: none;
			}
		}
	}
</style>
