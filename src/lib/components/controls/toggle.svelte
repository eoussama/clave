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
	<div class="toggle__label">{label}</div>
	<button type="button" class="toggle__button" on:click={onClick}>{value ? 'ON' : 'OFF'}</button>
</div>

<style lang="scss">
	.toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 10px 0;

		&__button {
			cursor: pointer;
		}
	}
</style>
