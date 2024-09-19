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
</script>

<Template let:args>
	<div class="parent">
		<Overlay {...args} />
	</div>
</Template>

<Story name="Default" />

<style lang="scss">
	.parent {
		width: 100%;
		height: 250px;
	}
</style>
