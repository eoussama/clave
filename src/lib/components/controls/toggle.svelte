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
	<button type="button" class="toggle__button" on:click={onClick}>{value ? 'ON' : 'OFF'}</button>
</div>

<style lang="scss">
	@import '../../../style/utils/focus';

	.toggle {
		$root: &;

		--toggle-label-color: var(--color-primary);

		&__button {
			cursor: pointer;

			@include focus(--toggle-label-color);
		}


	}
</style>
