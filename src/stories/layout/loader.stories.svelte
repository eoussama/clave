<script context="module">
	import Loader from '$lib/components/layout/loader.svelte';

	export const meta = {
		title: 'Layout/Loader',
		component: Loader,
		tags: ['autodocs']
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<div class="container">
		<Loader {...args} />
	</div>
</Template>

<Story name="Default" />
<Story name="Custom Text" args={{ text: 'Custom loading message...' }} />

<style lang="scss">
	.container {
		width: 100%;
		height: 400px;
	}
</style>
