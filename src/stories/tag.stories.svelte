<script context="module">
	import Tag from '$lib/components/controls/tag.svelte';

	export const meta = {
		title: 'Controls/Tag',
		component: Tag,
		tags: ['autodocs']
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Tag {...args} />
</Template>

<Story name="Default" args={{ tag: { text: 'Default' } }} />
<Story name="Disabled" args={{ tag: { text: 'Disabled' }, disabled: true }} />
<Story name="Readonly" args={{ tag: { text: 'Readonly' }, readonly: true }} />
