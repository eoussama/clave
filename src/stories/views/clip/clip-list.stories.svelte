<script context="module">
	import ClipList from '$lib/components/views/clip/clip-list.svelte';

	export const meta = {
		title: 'Views/Clip/List',
		component: ClipList,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ClipList {...args} />
</Template>

<Story name="Default" args={{}} />
