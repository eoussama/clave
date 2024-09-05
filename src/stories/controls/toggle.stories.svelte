<script context="module">
	import Toggle from '$lib/components/controls/toggle.svelte';

	export const meta = {
		title: 'Controls/Toggle',
		component: Toggle,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: { type: 'text' }
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Toggle {...args} />
</Template>

<Story name="Default" />
<Story name="Label" args={{ label: 'Default' }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
<Story name="Readonly" args={{ label: 'Readonly', readonly: true, value: true }} />
