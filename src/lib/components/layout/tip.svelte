<script lang="ts">
	import { fly } from 'svelte/transition';

	/**
	 * @description
	 * The text to display
	 */
	export let message: string;

	/**
	 * @description
	 * If the tip element is hovered
	 */
	let hovered: boolean = false;

	/**
	 * @description
	 * If the tip has a message
	 */
	const hasMessage = () => Boolean(message) && message.length > 0;

	/**
	 * @description
	 * Mouse enter event
	 */
	const onMouseEnter = () => {
		hovered = true;
	};

	/**
	 * @description
	 * Mouse leave event
	 */
	const onMouseLeave = () => {
		hovered = false;
	};
</script>

<span class="tip">
	<span class="tip__element" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
		<slot />
	</span>

	{#if hasMessage() && hovered}
		<div class="tip__box" transition:fly={{ x: -5, duration: 200 }}>
			<p class="tip__message">{message}</p>
		</div>
	{/if}
</span>

<style lang="scss">
	.tip {
		position: relative;
	}
</style>
