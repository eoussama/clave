<script context="module">
	import Check from '$lib/components/controls/check.svelte';

	export const meta = {
		title: 'Controls/Check',
		component: Check,
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
	<Check {...args} />
</Template>

<Story name="Default" />
<Story name="Label" args={{ label: 'Label' }} />
<Story name="Ripple" args={{ label: 'Ripple', ripple: true }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
<Story name="Readonly" args={{ label: 'Readonly', readonly: true, value: true }} />
