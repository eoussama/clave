<script context="module">
	import Action from '$lib/components/controls/action.svelte';

	export const meta = {
		title: 'Controls/Action',
		component: Action,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Action {...args} />
</Template>

<Story name="Default" args={{}} />
