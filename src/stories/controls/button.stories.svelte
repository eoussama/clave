<script context="module">
	import MdPlayArrow from 'svelte-icons/md/MdPlayArrow.svelte';
	import Button from '$lib/components/controls/button.svelte';

	const buttonStylesMapping = EnumHelper.toObject(ButtonStyle);
	const buttonSizesMapping = EnumHelper.toObject(ButtonSize);
	const buttonTypesMapping = EnumHelper.toObject(ButtonType);

	export const meta = {
		title: 'Controls/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			style: {
				control: { type: 'select' },
				mapping: buttonStylesMapping,
				options: Object.keys(buttonStylesMapping)
			},
			size: {
				control: { type: 'radio' },
				mapping: buttonSizesMapping,
				options: Object.keys(buttonSizesMapping)
			},
			type: {
				control: { type: 'select' },
				mapping: buttonTypesMapping,
				options: Object.keys(buttonTypesMapping)
			},
			icon: {
				control: false
			},
			loadingLabel: {
				control: { type: 'text' },
				if: { arg: 'loading', truthy: true }
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { EnumHelper } from '$lib/core/helpers/enum.helper';
	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { ButtonType } from '$lib/core/enums/button-type.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';
</script>

<Template let:args>
	<Button {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Primary" args={{ style: ButtonStyle.Primary, label: 'Primary' }} />
<Story name="Secondary" args={{ style: ButtonStyle.Secondary, label: 'Secondary' }} />
<Story name="Shine" args={{ shine: true }} />
<Story name="Ripple" args={{ ripple: true }} />
<Story name="Disabled" args={{ disabled: true, label: 'Disabled' }} />
<Story name="Loading" args={{ loading: true, loadingLabel: 'Loading...' }} />
<Story name="Icon & Text" args={{ icon: MdPlayArrow, label: 'Play' }} />
<Story name="Icon" args={{ icon: MdPlayArrow }} />
<Story name="Size" args={{ size: ButtonSize.Small, label: 'Small' }} />
