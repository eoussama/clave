<script context="module">
	import Empty from '$lib/components/views/empty.svelte';

	export const meta = {
		title: 'Views/Empty',
		component: Empty,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Empty {...args} />
</Template>

<Story name="Default" args={{ empty: true }} />
<Story name="Custom" args={{ empty: true }}>
	Custom Content
</Story>
