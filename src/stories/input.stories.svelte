<script context="module">
	import Input from '$lib/components/controls/input.svelte';

	export const meta = {
		title: 'Input',
		component: Input
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Input {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
<Story name="Error" args={{ label: 'Error', error: true, errorMsg: 'This is an error!' }} />
