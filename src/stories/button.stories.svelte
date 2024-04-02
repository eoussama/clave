<script context="module">
  import MdPlayArrow from 'svelte-icons/md/MdPlayArrow.svelte';
  import Button from '$lib/components/controls/button.svelte';

  export const meta = {
    title: 'Button',
    component: Button
  }
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ButtonType } from '$lib/core/enums/button-type.enum';
</script>

<Template let:args>
	<Button {...args} />
</Template>

<Story name="Default" args={{ label: 'Default' }} />
<Story name="Primary" args={{ type: ButtonType.Primary, label: 'Primary' }} />
<Story name="Secondary" args={{ type: ButtonType.Secondary, label: 'Secondary' }} />
<Story name="Icon" args={{ icon: MdPlayArrow, label: 'Play' }} />
<Story name="Loading" args={{ loading: true, loadingLabel: 'Loading...' }} />
