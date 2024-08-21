<script lang="ts">
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
	export let label: string = 'Toggle';

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
		dispatch('toggle', { value });
	};
</script>

<div class="toggle">
	<span class="toggle__label">{label}</span>
	<button class="toggle__button" type="button" on:click={onClick}>
		<div class="toggle__lobe" class:toggle__lobe--on={value}></div>
	</button>
</div>

<style lang="scss">
	@import '../../../style/utils/focus';

	.toggle {
		$root: &;

		--toggle-bg-color: transparent;
		--toggle-label-color: var(--color-primary);
		--toggle-lobe-color: hsl(var(--color-primary-hsl), 80%);
		--toggle-border-color: hsl(var(--color-primary-hsl), 80%);

		display: inline-flex;

		&__label {
			flex: 1;
			margin-right: 5px;

			color: var(--toggle-label-color);
			font-weight: var(--font-weight-regular);
		}

		&__button {
			cursor: pointer;

			width: 40px;
			background-color: var(--toggle-bg-color);

			border: none;
			border-radius: 50px;
			border: 1px solid var(--toggle-border-color);

			transition-duration: 0.2s;
			transition-property: background-color;

			#{$root}__lobe {
				width: 18px;
				height: 100%;

				top: 0;
				left: -4px;
				position: relative;

				border-radius: 50%;
				background-color: var(--toggle-lobe-color);

				transition-duration: 0.2s;
				transition-property: left width;

				&--on {
					left: calc(100% - 18px + 4px);
					--toggle-lobe-color: var(--color-primary);
				}
			}

			&:hover,
			&:active {
				--toggle-bg-color: hsl(var(--color-primary-hsl), 95%);
				--toggle-border-color: hsl(var(--color-primary-hsl), 75%);

				#{$root}__lobe {
					width: 22px;

					&--on {
						left: calc(100% - 22px + 4px);
					}
				}
			}

			@include focus(--toggle-label-color);
		}
	}
</style>
