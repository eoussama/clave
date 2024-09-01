<script context="module">
	import MdPlayArrow from 'svelte-icons/md/MdPlayArrow.svelte';
	import Button from '$lib/components/controls/button.svelte';

	const buttonTypesMapping = EnumHelper.toObject(ButtonType);
	const buttonSizesMapping = EnumHelper.toObject(ButtonSize);

	export const meta = {
		title: 'Controls/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				mapping: buttonTypesMapping,
				options: Object.keys(buttonTypesMapping)
			},
			size: {
        control: { type: 'radio' },
				mapping: buttonSizesMapping,
				options: Object.keys(buttonSizesMapping)
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
	import { ButtonType } from '$lib/core/enums/button-type.enum';
	import { ButtonSize } from '$lib/core/enums/button-size.enum';
</script>

<Template let:args>
	<Button {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Primary" args={{ type: ButtonType.Primary, label: 'Primary' }} />
<Story name="Secondary" args={{ type: ButtonType.Secondary, label: 'Secondary' }} />
<Story name="Shine" args={{ shine: true }} />
<Story name="Disabled" args={{ disabled: true, label: 'Disabled' }} />
<Story name="Loading" args={{ loading: true, loadingLabel: 'Loading...' }} />
<Story name="Icon & Text" args={{ icon: MdPlayArrow, label: 'Play' }} />
<Story name="Icon" args={{ icon: MdPlayArrow }} />
<Story name="Size" args={{ size: ButtonSize.Small, label: 'Small' }} />
