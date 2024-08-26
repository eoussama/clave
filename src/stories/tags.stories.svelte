<script context="module">
	import Tags from '$lib/components/controls/tags.svelte';

	export const meta = {
		title: 'Tags',
		component: Tags,
		tags: ['autodocs'],
		argTypes: {
			value: {
				control: false
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	const tags = [
		{ id: 'dd87e6f7-21f2-4f21-9f4d-95c2b78c146a', text: 'Orange' },
		{ id: '139e558f-ce8b-4ca7-9946-8465e1cfb9de', text: 'Apple' },
		{ id: '5cd6acb5-f501-4384-b48f-a540b368890f', text: 'Banana' },
		{ id: '6758e5cc-a6c2-41f3-98fd-a9a598e6923c', text: 'Grape' }
	];
</script>

<Template let:args>
	<Tags value={tags} {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
<Story name="Readonly" args={{ label: 'Readonly', readonly: true }} />
