<script context="module">
	import Dropdown from '$lib/components/controls/dropdown.svelte';

	export const meta = {
		title: 'Dropdown',
		component: Dropdown
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Dropdown {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
<Story name="Readonly" args={{ label: 'Readonly', readonly: true }} />
<Story name="Error" args={{ label: 'Default', error: true, errorMsg: 'This is an error!' }} />
