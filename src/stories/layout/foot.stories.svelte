<script context="module">
	import Foot from '$lib/components/layout/foot.svelte';

	export const meta = {
		title: 'Layout/Foot',
		component: Foot,
		tags: ['autodocs']
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<div class="container">
		<Foot {...args} />
	</div>
</Template>

<Story name="Default" />

<style lang="scss">
	.container {
		position: relative;

		width: 100%;
		height: auto;
	}
</style>
