<script context="module">
	import Tags from '$lib/components/controls/tags.svelte';

	export const meta = {
		title: 'Tags',
		component: Tags
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Tags {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
