<script context="module">
	import Tip from '$lib/components/layout/tip.svelte';

	import { EnumHelper } from '$lib/core/helpers/enum.helper';

	import { TipPositiion } from '$lib/core/enums/tip-position.enum';

	const tipPositionsMapping = EnumHelper.toObject(TipPositiion);

	export const meta = {
		title: 'Layout/Tip',
		component: Tip,
		tags: ['autodocs'],
		argTypes: {
			position: {
				control: { type: 'select' },
				mapping: tipPositionsMapping,
				options: Object.keys(tipPositionsMapping)
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<div class="content">
		<Tip {...args}>Hover Me!</Tip>
	</div>
</Template>

<Story name="Default" args={{ message: 'This is a tip!' }} />
<Story name="Disabled" args={{ message: 'Disabled a tip!', disabled: true }} />

<style lang="scss">
	.content {
		width: 300px;
		height: 200px;

		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 4px;
		border: 1px dashed gray;
	}
</style>
