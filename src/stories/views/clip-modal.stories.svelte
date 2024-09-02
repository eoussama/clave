<script context="module">
	import ClipModal from '$lib/components/views/clip-modal.svelte';

	export const meta = {
		title: 'Views/Clip/Modal',
		component: ClipModal,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ClipModal {...args} />
</Template>

<Story name="Default" args={{}} />
