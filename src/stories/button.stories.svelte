<script context="module">
  import Button from '$lib/components/controls/button.svelte';

  export const meta = {
    title: 'Button',
    component: Button
  }
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Button {...args} />
</Template>

<Story name="Default" args={{}} />
<Story name="Primary" args={{ primary: true }} />