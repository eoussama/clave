<script context="module">
	import Modal from '$lib/components/views/modal.svelte';

	export const meta = {
		title: 'Views/Modal',
		component: Modal,
		tags: ['autodocs'],
		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Modal {...args} />
</Template>

<Story name="Default" />
