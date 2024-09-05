<script context="module">
	import ClipSearch from '$lib/components/views/clip/clip-search.svelte';

	export const meta = {
		title: 'Views/Clip/Search',
		component: ClipSearch,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ClipSearch {...args} />
</Template>

<Story name="Default" />
<Story name="Delete" args={{ deleteBtn: true }} />
