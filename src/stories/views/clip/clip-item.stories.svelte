<script context="module">
	import ClipItem from '$lib/components/views/clip/clip-item.svelte';

	export const meta = {
		title: 'Views/Clip/Item',
		component: ClipItem,
		tags: ['autodocs'],
		argTypes: {
			clip: {
				control: false
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ClipType } from '$lib/core/enums/clip-type.enum';
	import type { TClip } from '$lib/core/types/clip.type';

	const clip: TClip = {
		sensitive: false,
		type: ClipType.Text,
		title: 'Lorem ipsum',
		creationTime: 1662363200,
		id: 'fcf3ebd9-a1a8-47e6-8c8e-151e0d212b66',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
		tags: [
			{ id: '6758e5cc-a6c2-41f3-98fd-a9a598e6923c', text: 'Grape' },
			{ id: '139e558f-ce8b-4ca7-9946-8465e1cfb9de', text: 'Apple' },
			{ id: 'dd87e6f7-21f2-4f21-9f4d-95c2b78c146a', text: 'Orange' },
			{ id: '5cd6acb5-f501-4384-b48f-a540b368890f', text: 'Banana' }
		]
	};
</script>

<Template let:args>
	<ClipItem {...args} {clip} />
</Template>

<Story name="Default" />
