<script context="module">
	import Overlay from '$lib/components/views/overlay.svelte';

	export const meta = {
		title: 'Views/Overlay',
		component: Overlay,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	/**
	 * @description
	 * If the overlay is visible
	 */
	let visible: boolean = true;
</script>

<Template let:args>
	<div class="root">
		<p class="main">
			lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et
		</p>

		<button class="toggle" on:click={() => (visible = !visible)}>Toggle Overlay</button>

		{#if visible}
			<Overlay block={args.block}>
				<div class="content">
					Content <button on:click={() => (visible = false)}>X</button>
				</div>
			</Overlay>
		{/if}
	</div>
</Template>

<Story name="Default" args={{ block: true }} />
<Story name="Toggleable" args={{ block: true }} />

<style lang="scss">
	.root {
		padding: 8px;
		position: relative;

		width: 250px;
		height: 250px;

		border-radius: 8px;
		border: 1px dashed #dddddd;

		.content {
			padding: 20px;

			border-radius: 8px;
			border: 2px dashed #dddddd;
			background-color: rgba(255, 255, 255, 0.87);
		}
	}
</style>
