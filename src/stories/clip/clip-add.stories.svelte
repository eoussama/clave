<script context="module">
	import ClipAdd from '$lib/components/clip/clip-add.svelte';

	export const meta = {
		title: 'Clip/Add',
		component: ClipAdd,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ClipAdd {...args} />
</Template>

<Story name="Default" args={{}} />
