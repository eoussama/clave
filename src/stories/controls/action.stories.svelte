<script context="module">
	import Action from '$lib/components/controls/action.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	export const meta = {
		title: 'Controls/Action',
		component: Action,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: { type: 'text' }
			},
			icon: {
				control: false
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Action {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Icon" args={{ label: 'Icon', icon: MdAdd }} />
<Story name="Shine" args={{ label: 'Shine', shine: true }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
