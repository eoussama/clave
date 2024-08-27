<script context="module">
	import Tip from '$lib/components/layout/tip.svelte';

	export const meta = {
		title: 'Layout/Tip',
		component: Tip,
		tags: ['autodocs']
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Tip {...args}>Hover Me!</Tip>
</Template>

<Story name="Default" args={{ message: 'This is a tip!' }} />
