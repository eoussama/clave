<script lang="ts">
	import { onMount } from 'svelte';

	import { Page } from '$lib/core/enums/page.enum';
	import { NavigationHelper } from '$lib/core/helpers/navigation.helper';

	onMount(() => {
		NavigationHelper.navigate(Page.Home);
	});
</script>
