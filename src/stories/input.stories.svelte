<script context="module">
	import Input from '$lib/components/controls/input.svelte';

	export const meta = {
		title: 'Input',
		component: Input
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { error } from '@sveltejs/kit';
</script>

<Template let:args>
	<Input {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Error" args={{ label: 'Default', error: true, errorMsg: 'This is an error!' }} />
