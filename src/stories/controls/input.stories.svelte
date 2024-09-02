<script context="module">
	import Input from '$lib/components/controls/input.svelte';

	import { InputType } from '$lib/core/enums/input-type.enum';
	import { EnumHelper } from '$lib/core/helpers/enum.helper';

	const inputTypesMapping = EnumHelper.toObject(InputType);

	export const meta = {
		title: 'Controls/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: { type: 'select' },
				mapping: inputTypesMapping,
				options: Object.keys(inputTypesMapping)
			},
			errorMsg: {
				control: { type: 'text' },
				if: { arg: 'error', truthy: true }
			},
			name: {
				control: false
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Input {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Disabled" args={{ label: 'Disabled', disabled: true }} />
<Story name="Readonly" args={{ label: 'Readonly', readonly: true }} />
<Story name="Editor" args={{ label: 'Editor', type: InputType.Editor }} />
<Story name="Error" args={{ label: 'Error', error: true, errorMsg: 'This is an error!' }} />
